const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, educatorOrAdmin, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get upcoming lessons for user (parent or educator)
router.get('/upcoming', authenticate, async (req, res) => {
  try {
    let sql;
    const params = [];

    if (req.user.role === 'educator') {
      // Get educator ID
      const educators = await query('SELECT id FROM educators WHERE user_id = ?', [req.user.id]);
      if (educators.length === 0) {
        return res.json([]);
      }

      sql = `
        SELECT l.*, s.first_name as student_name, e.language,
               u.first_name as parent_first_name, u.last_name as parent_last_name
        FROM lessons l
        JOIN enrollments e ON l.enrollment_id = e.id
        JOIN students s ON e.student_id = s.id
        JOIN users u ON s.parent_user_id = u.id
        WHERE l.educator_id = ? AND l.scheduled_at >= NOW() AND l.status = 'scheduled'
        ORDER BY l.scheduled_at ASC
        LIMIT 20
      `;
      params.push(educators[0].id);
    } else {
      // Parent - get lessons for their children
      sql = `
        SELECT l.*, s.first_name as student_name, e.language,
               edu_user.first_name as educator_first_name, edu_user.last_name as educator_last_name
        FROM lessons l
        JOIN enrollments e ON l.enrollment_id = e.id
        JOIN students s ON e.student_id = s.id
        JOIN educators edu ON l.educator_id = edu.id
        JOIN users edu_user ON edu.user_id = edu_user.id
        WHERE s.parent_user_id = ? AND l.scheduled_at >= NOW() AND l.status = 'scheduled'
        ORDER BY l.scheduled_at ASC
        LIMIT 20
      `;
      params.push(req.user.id);
    }

    const lessons = await query(sql, params);
    res.json(lessons);
  } catch (error) {
    console.error('Upcoming lessons fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get lesson history
router.get('/history', authenticate, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    let sql;
    const params = [];

    if (req.user.role === 'educator') {
      const educators = await query('SELECT id FROM educators WHERE user_id = ?', [req.user.id]);
      if (educators.length === 0) {
        return res.json([]);
      }

      sql = `
        SELECT l.*, s.first_name as student_name, e.language
        FROM lessons l
        JOIN enrollments e ON l.enrollment_id = e.id
        JOIN students s ON e.student_id = s.id
        WHERE l.educator_id = ? AND l.status = 'completed'
        ORDER BY l.completed_at DESC
        LIMIT ? OFFSET ?
      `;
      params.push(educators[0].id, parseInt(limit), parseInt(offset));
    } else {
      sql = `
        SELECT l.*, s.first_name as student_name, e.language,
               edu_user.first_name as educator_first_name
        FROM lessons l
        JOIN enrollments e ON l.enrollment_id = e.id
        JOIN students s ON e.student_id = s.id
        JOIN educators edu ON l.educator_id = edu.id
        JOIN users edu_user ON edu.user_id = edu_user.id
        WHERE s.parent_user_id = ? AND l.status = 'completed'
        ORDER BY l.completed_at DESC
        LIMIT ? OFFSET ?
      `;
      params.push(req.user.id, parseInt(limit), parseInt(offset));
    }

    const lessons = await query(sql, params);
    res.json(lessons);
  } catch (error) {
    console.error('Lesson history fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch lesson history' });
  }
});

// Schedule a lesson
router.post('/', authenticate, [
  body('enrollmentId').isInt(),
  body('educatorId').isInt(),
  body('scheduledAt').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { enrollmentId, educatorId, scheduledAt, duration = 30 } = req.body;

    // Verify enrollment belongs to user's student
    const enrollments = await query(`
      SELECT e.* FROM enrollments e
      JOIN students s ON e.student_id = s.id
      WHERE e.id = ? AND s.parent_user_id = ?
    `, [enrollmentId, req.user.id]);

    if (enrollments.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    // Check educator availability
    const conflicts = await query(`
      SELECT id FROM lessons
      WHERE educator_id = ?
      AND status IN ('scheduled', 'in_progress')
      AND scheduled_at BETWEEN DATE_SUB(?, INTERVAL ? MINUTE) AND DATE_ADD(?, INTERVAL ? MINUTE)
    `, [educatorId, scheduledAt, duration, scheduledAt, duration]);

    if (conflicts.length > 0) {
      return res.status(400).json({ error: 'Educator not available at this time' });
    }

    const result = await query(`
      INSERT INTO lessons (enrollment_id, educator_id, scheduled_at, duration, status)
      VALUES (?, ?, ?, ?, 'scheduled')
    `, [enrollmentId, educatorId, scheduledAt, duration]);

    res.status(201).json({
      message: 'Lesson scheduled',
      lessonId: result.insertId
    });
  } catch (error) {
    console.error('Lesson scheduling error:', error);
    res.status(500).json({ error: 'Failed to schedule lesson' });
  }
});

// Update lesson (educator)
router.put('/:id', authenticate, educatorOrAdmin, async (req, res) => {
  try {
    const { status, notes, educatorNotes, meetingUrl } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (educatorNotes !== undefined) updates.educator_notes = educatorNotes;
    if (meetingUrl) updates.meeting_url = meetingUrl;
    if (status === 'completed') updates.completed_at = new Date();

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(updates), req.params.id];

    await query(`UPDATE lessons SET ${setClauses} WHERE id = ?`, values);

    // Update enrollment completed_lessons count if completed
    if (status === 'completed') {
      await query(`
        UPDATE enrollments e
        SET completed_lessons = (
          SELECT COUNT(*) FROM lessons WHERE enrollment_id = e.id AND status = 'completed'
        )
        WHERE id = (SELECT enrollment_id FROM lessons WHERE id = ?)
      `, [req.params.id]);
    }

    res.json({ message: 'Lesson updated' });
  } catch (error) {
    console.error('Lesson update error:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

// Cancel lesson
router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    // Verify ownership
    const lessons = await query(`
      SELECT l.* FROM lessons l
      JOIN enrollments e ON l.enrollment_id = e.id
      JOIN students s ON e.student_id = s.id
      WHERE l.id = ? AND (s.parent_user_id = ? OR ? = 'admin')
    `, [req.params.id, req.user.id, req.user.role]);

    if (lessons.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    if (lessons[0].status !== 'scheduled') {
      return res.status(400).json({ error: 'Only scheduled lessons can be cancelled' });
    }

    await query('UPDATE lessons SET status = "cancelled" WHERE id = ?', [req.params.id]);

    res.json({ message: 'Lesson cancelled' });
  } catch (error) {
    console.error('Lesson cancellation error:', error);
    res.status(500).json({ error: 'Failed to cancel lesson' });
  }
});

// Submit lesson feedback (parent)
router.post('/:id/feedback', authenticate, [
  body('rating').isInt({ min: 1, max: 5 }),
  body('feedback').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, feedback } = req.body;

    // Verify ownership and completion
    const lessons = await query(`
      SELECT l.* FROM lessons l
      JOIN enrollments e ON l.enrollment_id = e.id
      JOIN students s ON e.student_id = s.id
      WHERE l.id = ? AND s.parent_user_id = ? AND l.status = 'completed'
    `, [req.params.id, req.user.id]);

    if (lessons.length === 0) {
      return res.status(404).json({ error: 'Completed lesson not found' });
    }

    await query(
      'UPDATE lessons SET rating = ?, feedback = ? WHERE id = ?',
      [rating, feedback, req.params.id]
    );

    // Update educator average rating
    const lesson = lessons[0];
    await query(`
      UPDATE educators SET rating = (
        SELECT AVG(rating) FROM lessons WHERE educator_id = ? AND rating IS NOT NULL
      ) WHERE id = ?
    `, [lesson.educator_id, lesson.educator_id]);

    res.json({ message: 'Feedback submitted' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Get available educators
router.get('/educators', async (req, res) => {
  try {
    const { language } = req.query;

    let sql = `
      SELECT e.id, e.languages, e.bio, e.hourly_rate, e.rating, e.total_lessons,
             u.first_name, u.last_name, u.avatar_url
      FROM educators e
      JOIN users u ON e.user_id = u.id
      WHERE e.status = 'approved'
    `;
    const params = [];

    if (language) {
      sql += ' AND JSON_CONTAINS(e.languages, ?)';
      params.push(JSON.stringify(language));
    }

    sql += ' ORDER BY e.rating DESC, e.total_lessons DESC';

    const educators = await query(sql, params);

    res.json(educators.map(e => ({
      ...e,
      languages: JSON.parse(e.languages)
    })));
  } catch (error) {
    console.error('Educators fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch educators' });
  }
});

module.exports = router;
