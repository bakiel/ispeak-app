const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('message').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message, inquiryType = 'general' } = req.body;

    const result = await query(`
      INSERT INTO contact_submissions (name, email, phone, subject, message, inquiry_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, phone, subject, message, inquiryType]);

    res.status(201).json({
      message: 'Message received. We will get back to you soon!',
      referenceId: result.insertId
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// Submit free trial request
router.post('/free-trial', [
  body('parentName').trim().notEmpty(),
  body('email').isEmail(),
  body('childAge').optional().isInt({ min: 3, max: 14 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      parentName, email, phone, childName, childAge,
      preferredLanguage, preferredTime, timezone, howHeard, notes
    } = req.body;

    // Check for existing request
    const existing = await query(
      'SELECT id FROM free_trial_requests WHERE email = ? AND status IN ("new", "contacted", "scheduled")',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: 'You already have a pending trial request. We will contact you soon!'
      });
    }

    const result = await query(`
      INSERT INTO free_trial_requests (
        parent_name, email, phone, child_name, child_age,
        preferred_language, preferred_time, timezone, how_heard, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      parentName, email, phone, childName, childAge,
      preferredLanguage, preferredTime, timezone, howHeard, notes
    ]);

    res.status(201).json({
      message: 'Free trial request submitted! We will contact you within 24 hours.',
      requestId: result.insertId
    });
  } catch (error) {
    console.error('Free trial request error:', error);
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

// ============ ADMIN ROUTES ============

// Get all contact submissions
router.get('/admin/messages', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, type, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT * FROM contact_submissions WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (type) {
      sql += ' AND inquiry_type = ?';
      params.push(type);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const messages = await query(sql, params);

    res.json(messages);
  } catch (error) {
    console.error('Messages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Update contact submission status
router.put('/admin/messages/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, response, assignedTo } = req.body;

    await query(`
      UPDATE contact_submissions SET
        status = COALESCE(?, status),
        response = ?,
        assigned_to = ?,
        responded_at = ?
      WHERE id = ?
    `, [status, response, assignedTo, response ? new Date() : null, req.params.id]);

    res.json({ message: 'Message updated' });
  } catch (error) {
    console.error('Message update error:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Get all trial requests
router.get('/admin/trials', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, language, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT * FROM free_trial_requests WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (language) {
      sql += ' AND preferred_language = ?';
      params.push(language);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const requests = await query(sql, params);

    res.json(requests);
  } catch (error) {
    console.error('Trial requests fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch trial requests' });
  }
});

// Update trial request status
router.put('/admin/trials/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, scheduledAt, notes } = req.body;

    await query(`
      UPDATE free_trial_requests SET
        status = COALESCE(?, status),
        scheduled_at = ?,
        notes = COALESCE(?, notes)
      WHERE id = ?
    `, [status, scheduledAt, notes, req.params.id]);

    res.json({ message: 'Trial request updated' });
  } catch (error) {
    console.error('Trial request update error:', error);
    res.status(500).json({ error: 'Failed to update trial request' });
  }
});

// Get inquiry statistics
router.get('/admin/stats', authenticate, adminOnly, async (req, res) => {
  try {
    const contactStats = await query(`
      SELECT
        status,
        COUNT(*) as count
      FROM contact_submissions
      GROUP BY status
    `);

    const trialStats = await query(`
      SELECT
        status,
        COUNT(*) as count
      FROM free_trial_requests
      GROUP BY status
    `);

    const languageInterest = await query(`
      SELECT
        preferred_language,
        COUNT(*) as count
      FROM free_trial_requests
      WHERE preferred_language IS NOT NULL
      GROUP BY preferred_language
    `);

    res.json({
      contactSubmissions: contactStats,
      trialRequests: trialStats,
      languageInterest
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
