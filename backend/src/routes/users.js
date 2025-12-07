const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get user's students (children)
router.get('/students', authenticate, async (req, res) => {
  try {
    const students = await query(`
      SELECT s.*,
             (SELECT COUNT(*) FROM enrollments WHERE student_id = s.id AND status = 'active') as active_enrollments
      FROM students s
      WHERE s.parent_user_id = ?
      ORDER BY s.created_at DESC
    `, [req.user.id]);

    res.json(students);
  } catch (error) {
    console.error('Students fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Add a student
router.post('/students', authenticate, [
  body('firstName').trim().notEmpty(),
  body('ageGroup').isIn(['3-5', '6-8', '9-11', '12-14'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, dateOfBirth, ageGroup, notes } = req.body;

    const result = await query(`
      INSERT INTO students (parent_user_id, first_name, last_name, date_of_birth, age_group, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [req.user.id, firstName, lastName, dateOfBirth, ageGroup, notes]);

    res.status(201).json({
      message: 'Student added',
      studentId: result.insertId
    });
  } catch (error) {
    console.error('Student creation error:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Update student
router.put('/students/:id', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, ageGroup, notes } = req.body;

    // Verify ownership
    const students = await query(
      'SELECT id FROM students WHERE id = ? AND parent_user_id = ?',
      [req.params.id, req.user.id]
    );

    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await query(`
      UPDATE students SET
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        date_of_birth = COALESCE(?, date_of_birth),
        age_group = COALESCE(?, age_group),
        notes = ?
      WHERE id = ?
    `, [firstName, lastName, dateOfBirth, ageGroup, notes, req.params.id]);

    res.json({ message: 'Student updated' });
  } catch (error) {
    console.error('Student update error:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Get enrollments for a student
router.get('/students/:id/enrollments', authenticate, async (req, res) => {
  try {
    // Verify ownership
    const students = await query(
      'SELECT id FROM students WHERE id = ? AND parent_user_id = ?',
      [req.params.id, req.user.id]
    );

    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const enrollments = await query(`
      SELECT e.*,
             (SELECT COUNT(*) FROM lessons WHERE enrollment_id = e.id) as total_lessons_scheduled,
             (SELECT COUNT(*) FROM lessons WHERE enrollment_id = e.id AND status = 'completed') as lessons_completed
      FROM enrollments e
      WHERE e.student_id = ?
      ORDER BY e.created_at DESC
    `, [req.params.id]);

    res.json(enrollments);
  } catch (error) {
    console.error('Enrollments fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Get notification preferences
router.get('/notifications', authenticate, async (req, res) => {
  try {
    const prefs = await query(
      'SELECT * FROM notification_preferences WHERE user_id = ?',
      [req.user.id]
    );

    if (prefs.length === 0) {
      // Return defaults
      return res.json({
        emailMarketing: true,
        emailLessons: true,
        emailOrders: true,
        emailPromotions: false,
        smsLessons: false,
        smsReminders: true
      });
    }

    const p = prefs[0];
    res.json({
      emailMarketing: p.email_marketing,
      emailLessons: p.email_lessons,
      emailOrders: p.email_orders,
      emailPromotions: p.email_promotions,
      smsLessons: p.sms_lessons,
      smsReminders: p.sms_reminders
    });
  } catch (error) {
    console.error('Preferences fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// Update notification preferences
router.put('/notifications', authenticate, async (req, res) => {
  try {
    const {
      emailMarketing, emailLessons, emailOrders,
      emailPromotions, smsLessons, smsReminders
    } = req.body;

    // Upsert preferences
    await query(`
      INSERT INTO notification_preferences (
        user_id, email_marketing, email_lessons, email_orders,
        email_promotions, sms_lessons, sms_reminders
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        email_marketing = VALUES(email_marketing),
        email_lessons = VALUES(email_lessons),
        email_orders = VALUES(email_orders),
        email_promotions = VALUES(email_promotions),
        sms_lessons = VALUES(sms_lessons),
        sms_reminders = VALUES(sms_reminders)
    `, [
      req.user.id, emailMarketing, emailLessons, emailOrders,
      emailPromotions, smsLessons, smsReminders
    ]);

    res.json({ message: 'Preferences updated' });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// ============ ADMIN ROUTES ============

// Get all users (admin)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { role, search, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT id, email, first_name, last_name, role, created_at, last_login FROM users WHERE 1=1';
    const params = [];

    if (role) {
      sql += ' AND role = ?';
      params.push(role);
    }

    if (search) {
      sql += ' AND (email LIKE ? OR first_name LIKE ? OR last_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const users = await query(sql, params);

    res.json(users);
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID (admin)
router.get('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const users = await query(`
      SELECT id, email, first_name, last_name, phone, role, avatar_url,
             email_verified, created_at, last_login
      FROM users WHERE id = ?
    `, [req.params.id]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get related data
    const students = await query('SELECT * FROM students WHERE parent_user_id = ?', [req.params.id]);
    const orders = await query(
      'SELECT id, order_number, total_amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
      [req.params.id]
    );

    res.json({
      ...users[0],
      students,
      recentOrders: orders
    });
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user role (admin)
router.put('/:id/role', authenticate, adminOnly, [
  body('role').isIn(['customer', 'educator', 'admin'])
], async (req, res) => {
  try {
    const { role } = req.body;

    // Prevent self-demotion
    if (req.params.id == req.user.id && role !== 'admin') {
      return res.status(400).json({ error: 'Cannot change your own role' });
    }

    await query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);

    res.json({ message: 'User role updated' });
  } catch (error) {
    console.error('Role update error:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
});

module.exports = router;
