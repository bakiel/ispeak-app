const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Create donation
router.post('/', [
  body('donorEmail').isEmail(),
  body('amount').isFloat({ min: 1 }),
  body('category').isIn(['fws_learners', 'partner_schools', 'language_councils', 'general'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      donorEmail,
      donorName,
      amount,
      currency = 'USD',
      category,
      frequency = 'one_time',
      message,
      isAnonymous = false,
      paymentIntentId
    } = req.body;

    const result = await query(`
      INSERT INTO donations (
        donor_email, donor_name, amount, currency, category,
        frequency, message, is_anonymous, payment_intent_id, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      donorEmail,
      isAnonymous ? null : donorName,
      amount,
      currency,
      category,
      frequency,
      message,
      isAnonymous,
      paymentIntentId
    ]);

    res.status(201).json({
      message: 'Donation recorded',
      donationId: result.insertId
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// Update donation payment status (webhook)
router.put('/:id/status', async (req, res) => {
  try {
    const { paymentStatus, subscriptionId } = req.body;

    await query(
      'UPDATE donations SET payment_status = ?, subscription_id = COALESCE(?, subscription_id) WHERE id = ?',
      [paymentStatus, subscriptionId, req.params.id]
    );

    res.json({ message: 'Donation status updated' });
  } catch (error) {
    console.error('Donation update error:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

// Get donation statistics (public)
router.get('/stats', async (req, res) => {
  try {
    const stats = await query(`
      SELECT
        category,
        COUNT(*) as count,
        SUM(amount) as total,
        AVG(amount) as average
      FROM donations
      WHERE payment_status = 'completed'
      GROUP BY category
    `);

    const totals = await query(`
      SELECT
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        COUNT(DISTINCT donor_email) as unique_donors
      FROM donations
      WHERE payment_status = 'completed'
    `);

    const monthly = await query(`
      SELECT
        COUNT(*) as count,
        SUM(amount) as total
      FROM donations
      WHERE payment_status = 'completed'
      AND frequency = 'monthly'
      AND subscription_id IS NOT NULL
    `);

    res.json({
      byCategory: stats,
      overall: totals[0],
      monthlyRecurring: monthly[0]
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch donation stats' });
  }
});

// Get donation progress for goals
router.get('/progress', async (req, res) => {
  try {
    const goals = {
      fws_learners: 50000,
      partner_schools: 25000,
      language_councils: 15000,
      general: 10000
    };

    const progress = await query(`
      SELECT
        category,
        SUM(amount) as raised,
        COUNT(*) as donor_count
      FROM donations
      WHERE payment_status = 'completed'
      GROUP BY category
    `);

    const result = Object.keys(goals).map(category => {
      const categoryProgress = progress.find(p => p.category === category);
      const raised = categoryProgress?.raised || 0;
      const goal = goals[category];

      return {
        category,
        goal,
        raised,
        percentage: Math.min(100, Math.round((raised / goal) * 100)),
        donorCount: categoryProgress?.donor_count || 0
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch donation progress' });
  }
});

// Get recent donations (public, anonymized)
router.get('/recent', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const donations = await query(`
      SELECT
        CASE WHEN is_anonymous THEN 'Anonymous' ELSE donor_name END as name,
        amount,
        category,
        message,
        created_at
      FROM donations
      WHERE payment_status = 'completed'
      ORDER BY created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);

    res.json(donations);
  } catch (error) {
    console.error('Recent donations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch recent donations' });
  }
});

// Get all donations (admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { category, status, startDate, endDate, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT * FROM donations WHERE 1=1';
    const params = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (status) {
      sql += ' AND payment_status = ?';
      params.push(status);
    }

    if (startDate) {
      sql += ' AND created_at >= ?';
      params.push(startDate);
    }

    if (endDate) {
      sql += ' AND created_at <= ?';
      params.push(endDate);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const donations = await query(sql, params);

    res.json(donations);
  } catch (error) {
    console.error('Donations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Export donations (admin only)
router.get('/export', authenticate, adminOnly, async (req, res) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;

    let sql = 'SELECT * FROM donations WHERE payment_status = "completed"';
    const params = [];

    if (startDate) {
      sql += ' AND created_at >= ?';
      params.push(startDate);
    }

    if (endDate) {
      sql += ' AND created_at <= ?';
      params.push(endDate);
    }

    sql += ' ORDER BY created_at DESC';

    const donations = await query(sql, params);

    if (format === 'csv') {
      const headers = 'ID,Date,Donor Email,Donor Name,Amount,Currency,Category,Frequency,Status\n';
      const rows = donations.map(d =>
        `${d.id},${d.created_at},${d.donor_email},${d.donor_name || 'Anonymous'},${d.amount},${d.currency},${d.category},${d.frequency},${d.payment_status}`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=donations.csv');
      res.send(headers + rows);
    } else {
      res.json(donations);
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export donations' });
  }
});

module.exports = router;
