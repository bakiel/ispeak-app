const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Middleware to check user role
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

// =============================================
// STUDENT PORTAL
// =============================================

// Get student dashboard data
router.get('/student/dashboard', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get enrolled languages and progress
    const progress = await query(`
      SELECT sp.*, l.name as language_name, l.native_name, l.slug as language_slug
      FROM student_progress sp
      JOIN languages l ON sp.language_id = l.id
      WHERE sp.user_id = ?
    `, [userId]);

    // Get upcoming lessons
    const upcomingLessons = await query(`
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as educator_name
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      LEFT JOIN users u ON lb.educator_id = u.id
      WHERE lb.student_id = ?
        AND lb.scheduled_date >= CURDATE()
        AND lb.status IN ('confirmed', 'pending')
      ORDER BY lb.scheduled_date ASC, lb.scheduled_time ASC
      LIMIT 5
    `, [userId]);

    // Get recent achievements
    const achievements = await query(`
      SELECT a.*, ua.earned_at
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ?
      ORDER BY ua.earned_at DESC
      LIMIT 5
    `, [userId]);

    // Get recent notifications
    const notifications = await query(`
      SELECT * FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId]);

    // Calculate overall stats
    const stats = {
      totalLessonsCompleted: progress.reduce((sum, p) => sum + (p.total_lessons_completed || 0), 0),
      totalPracticeMinutes: progress.reduce((sum, p) => sum + (p.total_practice_minutes || 0), 0),
      vocabularyLearned: progress.reduce((sum, p) => sum + (p.vocabulary_learned || 0), 0),
      currentStreak: Math.max(...progress.map(p => p.current_streak_days || 0), 0),
      languagesEnrolled: progress.length
    };

    res.json({
      progress,
      upcomingLessons,
      achievements,
      notifications,
      stats
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get student's lessons history
router.get('/student/lessons', authenticate, async (req, res) => {
  try {
    const { status, language_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as educator_name,
             u.avatar_url as educator_avatar
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      LEFT JOIN users u ON lb.educator_id = u.id
      WHERE lb.student_id = ?
    `;
    const params = [req.user.id];

    if (status) {
      sql += ' AND lb.status = ?';
      params.push(status);
    }

    if (language_id) {
      sql += ' AND lb.language_id = ?';
      params.push(language_id);
    }

    sql += ' ORDER BY lb.scheduled_date DESC, lb.scheduled_time DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const lessons = await query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM lesson_bookings WHERE student_id = ?';
    const countParams = [req.user.id];
    if (status) {
      countSql += ' AND status = ?';
      countParams.push(status);
    }
    if (language_id) {
      countSql += ' AND language_id = ?';
      countParams.push(language_id);
    }

    const countResult = await query(countSql, countParams);
    const total = countResult[0].total;

    res.json({
      lessons,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Student lessons error:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get student's learning progress for a language
router.get('/student/progress/:languageId', authenticate, async (req, res) => {
  try {
    const { languageId } = req.params;

    const progress = await query(`
      SELECT sp.*, l.name as language_name
      FROM student_progress sp
      JOIN languages l ON sp.language_id = l.id
      WHERE sp.user_id = ? AND sp.language_id = ?
    `, [req.user.id, languageId]);

    if (progress.length === 0) {
      return res.status(404).json({ error: 'No progress found for this language' });
    }

    // Get completed lessons
    const completedLessons = await query(`
      SELECT ulp.*, ll.title, ll.lesson_type, lm.name as module_name
      FROM user_lesson_progress ulp
      JOIN learning_lessons ll ON ulp.lesson_id = ll.id
      JOIN learning_modules lm ON ll.module_id = lm.id
      WHERE ulp.user_id = ? AND lm.language_id = ? AND ulp.status = 'completed'
      ORDER BY ulp.completed_at DESC
    `, [req.user.id, languageId]);

    res.json({
      progress: progress[0],
      completedLessons
    });
  } catch (error) {
    console.error('Student progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Enroll student in a language
router.post('/student/enroll', authenticate, [
  body('language_id').isInt()
], async (req, res) => {
  try {
    const { language_id } = req.body;

    // Check if already enrolled
    const existing = await query(
      'SELECT id FROM student_progress WHERE user_id = ? AND language_id = ?',
      [req.user.id, language_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already enrolled in this language' });
    }

    await query(`
      INSERT INTO student_progress (user_id, language_id, current_level)
      VALUES (?, ?, 'beginner')
    `, [req.user.id, language_id]);

    res.status(201).json({ message: 'Successfully enrolled' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

// =============================================
// EDUCATOR/TEACHER PORTAL
// =============================================

// Get educator dashboard
router.get('/educator/dashboard', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const educatorId = req.user.id;

    // Get today's lessons
    const todayLessons = await query(`
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      JOIN users u ON lb.student_id = u.id
      WHERE lb.educator_id = ?
        AND lb.scheduled_date = CURDATE()
        AND lb.status = 'confirmed'
      ORDER BY lb.scheduled_time ASC
    `, [educatorId]);

    // Get upcoming lessons this week
    const upcomingLessons = await query(`
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      JOIN users u ON lb.student_id = u.id
      WHERE lb.educator_id = ?
        AND lb.scheduled_date > CURDATE()
        AND lb.scheduled_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
        AND lb.status = 'confirmed'
      ORDER BY lb.scheduled_date ASC, lb.scheduled_time ASC
    `, [educatorId]);

    // Get pending lesson requests
    const pendingRequests = await query(`
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      JOIN users u ON lb.student_id = u.id
      WHERE lb.educator_id = ? AND lb.status = 'pending'
      ORDER BY lb.created_at ASC
    `, [educatorId]);

    // Get student count
    const studentCount = await query(`
      SELECT COUNT(DISTINCT student_id) as count
      FROM lesson_bookings
      WHERE educator_id = ? AND status IN ('confirmed', 'completed')
    `, [educatorId]);

    // Get completed lessons this month
    const monthlyStats = await query(`
      SELECT COUNT(*) as lessons_completed,
             SUM(duration_minutes) as total_minutes
      FROM lesson_bookings
      WHERE educator_id = ?
        AND status = 'completed'
        AND MONTH(scheduled_date) = MONTH(CURDATE())
        AND YEAR(scheduled_date) = YEAR(CURDATE())
    `, [educatorId]);

    res.json({
      todayLessons,
      upcomingLessons,
      pendingRequests,
      stats: {
        totalStudents: studentCount[0].count,
        lessonsCompletedThisMonth: monthlyStats[0].lessons_completed || 0,
        totalMinutesThisMonth: monthlyStats[0].total_minutes || 0
      }
    });
  } catch (error) {
    console.error('Educator dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get educator's students
router.get('/educator/students', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const students = await query(`
      SELECT DISTINCT u.id, u.first_name, u.last_name, u.email, u.avatar_url,
             (SELECT COUNT(*) FROM lesson_bookings WHERE student_id = u.id AND educator_id = ? AND status = 'completed') as completed_lessons,
             (SELECT MAX(scheduled_date) FROM lesson_bookings WHERE student_id = u.id AND educator_id = ? AND status = 'completed') as last_lesson
      FROM users u
      JOIN lesson_bookings lb ON u.id = lb.student_id
      WHERE lb.educator_id = ? AND lb.status IN ('confirmed', 'completed')
      ORDER BY u.first_name, u.last_name
    `, [req.user.id, req.user.id, req.user.id]);

    res.json(students);
  } catch (error) {
    console.error('Educator students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Update lesson status (educator)
router.put('/educator/lessons/:lessonId/status', authenticate, requireRole('educator', 'admin'), [
  body('status').isIn(['confirmed', 'cancelled', 'completed', 'no-show'])
], async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { status, notes } = req.body;

    // Verify educator owns this lesson
    const lesson = await query(
      'SELECT id FROM lesson_bookings WHERE id = ? AND educator_id = ?',
      [lessonId, req.user.id]
    );

    if (lesson.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await query(
      'UPDATE lesson_bookings SET status = ?, educator_notes = ? WHERE id = ?',
      [status, notes || null, lessonId]
    );

    // If completed, update student progress
    if (status === 'completed') {
      const lessonDetails = await query('SELECT student_id, language_id, duration_minutes FROM lesson_bookings WHERE id = ?', [lessonId]);
      if (lessonDetails.length > 0) {
        const { student_id, language_id, duration_minutes } = lessonDetails[0];
        await query(`
          UPDATE student_progress
          SET total_lessons_completed = total_lessons_completed + 1,
              total_practice_minutes = total_practice_minutes + ?,
              last_activity_date = CURDATE()
          WHERE user_id = ? AND language_id = ?
        `, [duration_minutes || 30, student_id, language_id]);
      }
    }

    res.json({ message: 'Lesson status updated' });
  } catch (error) {
    console.error('Lesson status update error:', error);
    res.status(500).json({ error: 'Failed to update lesson status' });
  }
});

// =============================================
// PARENT PORTAL
// =============================================

// Get parent dashboard (children's data)
router.get('/parent/dashboard', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    // Get linked children
    const children = await query(`
      SELECT u.id, u.first_name, u.last_name, u.avatar_url, u.created_at
      FROM users u
      JOIN parent_child_links pcl ON u.id = pcl.child_id
      WHERE pcl.parent_id = ?
    `, [req.user.id]);

    const childrenData = await Promise.all(children.map(async (child) => {
      // Get child's progress
      const progress = await query(`
        SELECT sp.*, l.name as language_name
        FROM student_progress sp
        JOIN languages l ON sp.language_id = l.id
        WHERE sp.user_id = ?
      `, [child.id]);

      // Get child's upcoming lessons
      const upcomingLessons = await query(`
        SELECT lb.*, l.name as language_name,
               CONCAT(u.first_name, ' ', u.last_name) as educator_name
        FROM lesson_bookings lb
        JOIN languages l ON lb.language_id = l.id
        LEFT JOIN users u ON lb.educator_id = u.id
        WHERE lb.student_id = ?
          AND lb.scheduled_date >= CURDATE()
          AND lb.status IN ('confirmed', 'pending')
        ORDER BY lb.scheduled_date ASC
        LIMIT 3
      `, [child.id]);

      // Get recent achievements
      const achievements = await query(`
        SELECT a.name, a.icon, ua.earned_at
        FROM user_achievements ua
        JOIN achievements a ON ua.achievement_id = a.id
        WHERE ua.user_id = ?
        ORDER BY ua.earned_at DESC
        LIMIT 3
      `, [child.id]);

      return {
        ...child,
        progress,
        upcomingLessons,
        recentAchievements: achievements
      };
    }));

    res.json({ children: childrenData });
  } catch (error) {
    console.error('Parent dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Link child to parent
router.post('/parent/link-child', authenticate, requireRole('parent', 'admin'), [
  body('child_email').isEmail()
], async (req, res) => {
  try {
    const { child_email } = req.body;

    // Find child account
    const children = await query(
      'SELECT id FROM users WHERE email = ? AND role = "student"',
      [child_email]
    );

    if (children.length === 0) {
      return res.status(404).json({ error: 'Student account not found' });
    }

    const childId = children[0].id;

    // Check if already linked
    const existing = await query(
      'SELECT id FROM parent_child_links WHERE parent_id = ? AND child_id = ?',
      [req.user.id, childId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Child already linked' });
    }

    await query(
      'INSERT INTO parent_child_links (parent_id, child_id) VALUES (?, ?)',
      [req.user.id, childId]
    );

    res.status(201).json({ message: 'Child linked successfully' });
  } catch (error) {
    console.error('Link child error:', error);
    res.status(500).json({ error: 'Failed to link child' });
  }
});

// =============================================
// LESSON BOOKING
// =============================================

// Get available time slots for an educator
router.get('/booking/availability/:educatorId', authenticate, async (req, res) => {
  try {
    const { educatorId } = req.params;
    const { date } = req.query;

    // Get educator's schedule
    const schedule = await query(`
      SELECT * FROM educator_availability
      WHERE educator_id = ? AND day_of_week = DAYOFWEEK(?)
    `, [educatorId, date]);

    // Get already booked slots
    const bookedSlots = await query(`
      SELECT scheduled_time, duration_minutes
      FROM lesson_bookings
      WHERE educator_id = ? AND scheduled_date = ? AND status IN ('confirmed', 'pending')
    `, [educatorId, date]);

    res.json({ schedule, bookedSlots });
  } catch (error) {
    console.error('Availability error:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Get available educators for a language
router.get('/booking/educators/:languageId', authenticate, async (req, res) => {
  try {
    const { languageId } = req.params;

    const educators = await query(`
      SELECT u.id, u.first_name, u.last_name, u.avatar_url,
             el.proficiency, el.is_primary,
             (SELECT AVG(rating) FROM lesson_reviews WHERE educator_id = u.id) as avg_rating,
             (SELECT COUNT(*) FROM lesson_bookings WHERE educator_id = u.id AND status = 'completed') as total_lessons
      FROM users u
      JOIN educator_languages el ON u.id = el.educator_id
      WHERE el.language_id = ? AND u.role = 'educator'
      ORDER BY (el.proficiency = 'native') DESC, total_lessons DESC
    `, [languageId]);

    res.json(educators);
  } catch (error) {
    console.error('Educators fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch educators' });
  }
});

// Book a lesson
router.post('/booking/book', authenticate, [
  body('language_id').isInt(),
  body('educator_id').isInt(),
  body('scheduled_date').isDate(),
  body('scheduled_time').matches(/^\d{2}:\d{2}$/),
  body('duration_minutes').optional().isInt({ min: 15, max: 120 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { language_id, educator_id, scheduled_date, scheduled_time, duration_minutes = 30, notes } = req.body;

    // Check for conflicts
    const conflicts = await query(`
      SELECT id FROM lesson_bookings
      WHERE educator_id = ? AND scheduled_date = ? AND scheduled_time = ? AND status IN ('confirmed', 'pending')
    `, [educator_id, scheduled_date, scheduled_time]);

    if (conflicts.length > 0) {
      return res.status(400).json({ error: 'Time slot not available' });
    }

    const result = await query(`
      INSERT INTO lesson_bookings
      (student_id, educator_id, language_id, scheduled_date, scheduled_time, duration_minutes, student_notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [req.user.id, educator_id, language_id, scheduled_date, scheduled_time, duration_minutes, notes || null]);

    // Create notification for educator
    await query(`
      INSERT INTO notifications (user_id, title, message, type, action_url)
      VALUES (?, 'New Lesson Request', 'You have a new lesson booking request', 'info', '/educator/lessons')
    `, [educator_id]);

    res.status(201).json({
      message: 'Lesson booked successfully',
      bookingId: result.insertId
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to book lesson' });
  }
});

// Cancel a lesson
router.put('/booking/:bookingId/cancel', authenticate, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    // Verify ownership
    const booking = await query(
      'SELECT * FROM lesson_bookings WHERE id = ? AND (student_id = ? OR educator_id = ?)',
      [bookingId, req.user.id, req.user.id]
    );

    if (booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await query(
      'UPDATE lesson_bookings SET status = "cancelled", cancellation_reason = ? WHERE id = ?',
      [reason || null, bookingId]
    );

    res.json({ message: 'Lesson cancelled' });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ error: 'Failed to cancel lesson' });
  }
});

// =============================================
// NOTIFICATIONS
// =============================================

// Get user notifications
router.get('/notifications', authenticate, async (req, res) => {
  try {
    const notifications = await query(`
      SELECT * FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50
    `, [req.user.id]);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    res.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/notifications/:id/read', authenticate, async (req, res) => {
  try {
    await query(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Mark all notifications as read
router.put('/notifications/read-all', authenticate, async (req, res) => {
  try {
    await query(
      'UPDATE notifications SET is_read = TRUE WHERE user_id = ?',
      [req.user.id]
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});

module.exports = router;
