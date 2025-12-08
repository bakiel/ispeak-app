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
    const limitNum = parseInt(limit) || 10;
    const pageNum = parseInt(page) || 1;
    const offset = (pageNum - 1) * limitNum;

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
      params.push(parseInt(language_id));
    }

    sql += ` ORDER BY lb.scheduled_date DESC, lb.scheduled_time DESC LIMIT ${limitNum} OFFSET ${offset}`;

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
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
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

// Get all student progress (no language filter)
router.get('/student/progress', authenticate, async (req, res) => {
  try {
    // Use user_id column (matches actual database schema)
    let progress = await query(`
      SELECT sp.*, l.name as language_name, l.native_name, l.slug as language_slug
      FROM student_progress sp
      JOIN languages l ON sp.language_id = l.id
      WHERE sp.user_id = ?
    `, [req.user.id]);

    // Calculate overall stats
    const stats = {
      totalLessonsCompleted: progress.reduce((sum, p) => sum + (p.total_lessons_completed || p.level || 0), 0),
      totalPracticeMinutes: progress.reduce((sum, p) => sum + (p.total_practice_minutes || 0), 0),
      vocabularyLearned: progress.reduce((sum, p) => sum + (p.vocabulary_learned || p.points || 0), 0),
      currentStreak: Math.max(...progress.map(p => p.current_streak_days || 0), 0),
      languagesEnrolled: progress.length
    };

    res.json({ progress, stats });
  } catch (error) {
    console.error('Student progress error:', error);
    // Return empty progress if table doesn't exist or has different structure
    res.json({ progress: [], stats: { totalLessonsCompleted: 0, totalPracticeMinutes: 0, vocabularyLearned: 0, currentStreak: 0, languagesEnrolled: 0 } });
  }
});

// Get student achievements
router.get('/student/achievements', authenticate, async (req, res) => {
  try {
    // Try student_achievements table (from schema)
    let achievements = [];
    try {
      achievements = await query(`
        SELECT a.*, sa.earned_at
        FROM student_achievements sa
        JOIN achievements a ON sa.achievement_id = a.id
        WHERE sa.user_id = ?
        ORDER BY sa.earned_at DESC
      `, [req.user.id]);
    } catch (e) {
      // Table might not exist
      achievements = [];
    }

    // Get all available achievements for comparison
    let allAchievements = [];
    try {
      allAchievements = await query('SELECT * FROM achievements ORDER BY type, name');
    } catch (e) {
      allAchievements = [];
    }

    res.json({
      earned: achievements,
      available: allAchievements,
      totalEarned: achievements.length,
      totalAvailable: allAchievements.length
    });
  } catch (error) {
    console.error('Achievements error:', error);
    // Return empty if tables don't exist
    res.json({ earned: [], available: [], totalEarned: 0, totalAvailable: 0 });
  }
});

// Get available educators for booking
router.get('/student/educators', authenticate, async (req, res) => {
  try {
    const { language_id } = req.query;

    // Simple query that works with actual database schema (users table has no bio column)
    let sql = `
      SELECT u.id, u.first_name, u.last_name, u.avatar_url,
             (SELECT COUNT(*) FROM lesson_bookings WHERE educator_id = u.id AND status = 'completed') as total_lessons
      FROM users u
      WHERE u.role = 'educator'
      ORDER BY total_lessons DESC
    `;

    const educators = await query(sql);

    // Add placeholder data for display
    const educatorsWithDefaults = educators.map(e => ({
      ...e,
      languages: 'Multiple Languages',
      avg_rating: 4.8,
      total_lessons: e.total_lessons || 0
    }));

    res.json({ educators: educatorsWithDefaults });
  } catch (error) {
    console.error('Educators fetch error:', error);
    // Return empty array instead of error for better UX
    res.json({ educators: [] });
  }
});

// Get languages available
router.get('/student/languages', authenticate, async (req, res) => {
  try {
    const languages = await query(`
      SELECT l.*,
             (SELECT COUNT(*) FROM users u JOIN educator_languages el ON u.id = el.educator_id WHERE el.language_id = l.id) as educator_count
      FROM languages l
      WHERE l.is_active = 1
      ORDER BY l.name
    `);

    res.json({ languages });
  } catch (error) {
    console.error('Languages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// Get educator schedule
router.get('/educator/schedule', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let sql = `
      SELECT lb.*, l.name as language_name,
             CONCAT(u.first_name, ' ', u.last_name) as student_name,
             u.avatar_url as student_avatar
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      JOIN users u ON lb.student_id = u.id
      WHERE lb.educator_id = ?
    `;
    const params = [req.user.id];

    if (start_date) {
      sql += ' AND lb.scheduled_date >= ?';
      params.push(start_date);
    }
    if (end_date) {
      sql += ' AND lb.scheduled_date <= ?';
      params.push(end_date);
    }

    sql += ' ORDER BY lb.scheduled_date ASC, lb.scheduled_time ASC';

    const lessons = await query(sql, params);

    res.json({ lessons });
  } catch (error) {
    console.error('Educator schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Get educator availability settings
router.get('/educator/availability', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const availability = await query(`
      SELECT * FROM educator_availability
      WHERE educator_id = ?
      ORDER BY day_of_week, start_time
    `, [req.user.id]);

    res.json({ availability });
  } catch (error) {
    console.error('Educator availability error:', error);
    res.json({ availability: [] });
  }
});

// Set educator availability
router.post('/educator/availability', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const { availability } = req.body;

    // Clear existing availability
    await query('DELETE FROM educator_availability WHERE educator_id = ?', [req.user.id]);

    // Insert new availability
    for (const slot of availability) {
      await query(`
        INSERT INTO educator_availability (educator_id, day_of_week, start_time, end_time, is_available)
        VALUES (?, ?, ?, ?, ?)
      `, [req.user.id, slot.day_of_week, slot.start_time, slot.end_time, slot.is_available !== false]);
    }

    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    console.error('Set availability error:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Get educator reports/analytics
router.get('/educator/reports', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    let dateFilter = 'MONTH(scheduled_date) = MONTH(CURDATE()) AND YEAR(scheduled_date) = YEAR(CURDATE())';
    if (period === 'week') {
      dateFilter = 'scheduled_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
    } else if (period === 'year') {
      dateFilter = 'YEAR(scheduled_date) = YEAR(CURDATE())';
    }

    // Get lesson stats
    const lessonStats = await query(`
      SELECT
        COUNT(*) as total_lessons,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN status = 'no-show' THEN 1 ELSE 0 END) as no_shows,
        SUM(CASE WHEN status = 'completed' THEN duration_minutes ELSE 0 END) as total_minutes
      FROM lesson_bookings
      WHERE educator_id = ? AND ${dateFilter}
    `, [req.user.id]);

    // Get student count
    const studentStats = await query(`
      SELECT COUNT(DISTINCT student_id) as unique_students
      FROM lesson_bookings
      WHERE educator_id = ? AND ${dateFilter}
    `, [req.user.id]);

    // Get lessons by language
    const byLanguage = await query(`
      SELECT l.name as language, COUNT(*) as count
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      WHERE lb.educator_id = ? AND lb.status = 'completed' AND ${dateFilter}
      GROUP BY l.id
    `, [req.user.id]);

    // Get average rating
    const ratings = await query(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as review_count
      FROM lesson_reviews
      WHERE educator_id = ?
    `, [req.user.id]);

    res.json({
      period,
      lessons: lessonStats[0] || {},
      students: studentStats[0]?.unique_students || 0,
      byLanguage,
      rating: {
        average: ratings[0]?.avg_rating || 0,
        count: ratings[0]?.review_count || 0
      }
    });
  } catch (error) {
    console.error('Educator reports error:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Update educator profile/settings
router.put('/educator/settings', authenticate, requireRole('educator', 'admin'), async (req, res) => {
  try {
    const { firstName, lastName, bio, phone, timezone, languages } = req.body;

    await query(`
      UPDATE users SET first_name = ?, last_name = ?, bio = ?, phone = ?, timezone = ?
      WHERE id = ?
    `, [firstName, lastName, bio || null, phone || null, timezone || 'America/New_York', req.user.id]);

    // Update languages if provided
    if (languages && Array.isArray(languages)) {
      await query('DELETE FROM educator_languages WHERE educator_id = ?', [req.user.id]);
      for (const lang of languages) {
        await query(`
          INSERT INTO educator_languages (educator_id, language_id, proficiency, is_primary)
          VALUES (?, ?, ?, ?)
        `, [req.user.id, lang.language_id, lang.proficiency || 'fluent', lang.is_primary || false]);
      }
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
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

// Get parent's children list
router.get('/parent/children', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const children = await query(`
      SELECT u.id, u.first_name, u.last_name, u.email, u.avatar_url, u.created_at,
             (SELECT l.name FROM languages l
              JOIN student_progress sp ON l.id = sp.language_id
              WHERE sp.user_id = u.id
              ORDER BY sp.updated_at DESC LIMIT 1) as current_language,
             (SELECT sp.current_level FROM student_progress sp WHERE sp.user_id = u.id ORDER BY sp.updated_at DESC LIMIT 1) as current_level
      FROM users u
      JOIN parent_child_links pcl ON u.id = pcl.child_id
      WHERE pcl.parent_id = ?
      ORDER BY u.first_name ASC
    `, [req.user.id]);

    res.json({ children });
  } catch (error) {
    console.error('Get children error:', error);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
});

// Add a new child
router.post('/parent/children', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { first_name, last_name, email, language_id } = req.body;

    // Create student account for child
    const bcrypt = require('bcryptjs');
    const tempPassword = Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(tempPassword, 10);

    // Generate unique email if not provided
    const childEmail = email || `child_${Date.now()}_${Math.random().toString(36).slice(-4)}@child.ispeak.local`;

    const result = await query(`
      INSERT INTO users (first_name, last_name, email, password_hash, role)
      VALUES (?, ?, ?, ?, 'student')
    `, [first_name, last_name, childEmail, hash]);

    const childId = result.insertId;

    // Link to parent
    await query('INSERT INTO parent_child_links (parent_id, child_id) VALUES (?, ?)', [req.user.id, childId]);

    // Set up initial language progress if specified
    if (language_id) {
      await query(`
        INSERT INTO student_progress (user_id, language_id, current_level, lessons_completed, total_practice_time)
        VALUES (?, ?, 'beginner', 0, 0)
      `, [childId, language_id]);
    }

    res.status(201).json({
      message: 'Child added successfully',
      childId,
      tempPassword: email ? tempPassword : null
    });
  } catch (error) {
    console.error('Add child error:', error);
    res.status(500).json({ error: 'Failed to add child' });
  }
});

// Update child info
router.put('/parent/children/:childId', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { childId } = req.params;
    const { first_name, last_name, language_id } = req.body;

    // Verify parent owns this child
    const link = await query(
      'SELECT id FROM parent_child_links WHERE parent_id = ? AND child_id = ?',
      [req.user.id, childId]
    );

    if (link.length === 0) {
      return res.status(403).json({ error: 'Not authorized to update this child' });
    }

    await query(`
      UPDATE users SET first_name = ?, last_name = ?
      WHERE id = ?
    `, [first_name, last_name, childId]);

    res.json({ message: 'Child updated successfully' });
  } catch (error) {
    console.error('Update child error:', error);
    res.status(500).json({ error: 'Failed to update child' });
  }
});

// Remove child link
router.delete('/parent/children/:childId', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { childId } = req.params;

    await query(
      'DELETE FROM parent_child_links WHERE parent_id = ? AND child_id = ?',
      [req.user.id, childId]
    );

    res.json({ message: 'Child unlinked successfully' });
  } catch (error) {
    console.error('Unlink child error:', error);
    res.status(500).json({ error: 'Failed to unlink child' });
  }
});

// Get child progress
router.get('/parent/children/:childId/progress', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { childId } = req.params;

    // Verify parent owns this child
    const link = await query(
      'SELECT id FROM parent_child_links WHERE parent_id = ? AND child_id = ?',
      [req.user.id, childId]
    );

    if (link.length === 0) {
      return res.status(403).json({ error: 'Not authorized to view this child' });
    }

    // Get progress data
    const progressData = await query(`
      SELECT sp.*, l.name as language_name
      FROM student_progress sp
      JOIN languages l ON sp.language_id = l.id
      WHERE sp.user_id = ?
    `, [childId]);

    // Get lesson stats
    const lessonStats = await query(`
      SELECT
        COUNT(*) as total_lessons,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_lessons,
        SUM(CASE WHEN status = 'completed' THEN duration_minutes ELSE 0 END) as total_practice_minutes
      FROM lesson_bookings
      WHERE student_id = ?
    `, [childId]);

    // Get achievements
    const achievements = await query(`
      SELECT a.name, a.description, a.icon, ua.earned_at
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ?
      ORDER BY ua.earned_at DESC
    `, [childId]);

    // Get weekly activity
    const weeklyActivity = await query(`
      SELECT DAYOFWEEK(scheduled_date) as day, COUNT(*) as count
      FROM lesson_bookings
      WHERE student_id = ?
        AND scheduled_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND status = 'completed'
      GROUP BY DAYOFWEEK(scheduled_date)
    `, [childId]);

    const stats = lessonStats[0] || {};
    const progress = progressData[0] || {};

    res.json({
      overallProgress: progress.lessons_completed ? Math.min(100, Math.round((progress.lessons_completed / 50) * 100)) : 0,
      lessonsCompleted: stats.completed_lessons || 0,
      practiceHours: Math.round((stats.total_practice_minutes || 0) / 60),
      vocabularyLearned: progress.vocabulary_count || 0,
      currentStreak: progress.streak_days || 0,
      skills: {
        speaking: progress.speaking_score || 0,
        listening: progress.listening_score || 0,
        reading: progress.reading_score || 0,
        writing: progress.writing_score || 0
      },
      recentAchievements: achievements,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
        const dayData = weeklyActivity.find(w => w.day === i + 1);
        return dayData ? dayData.count : 0;
      })
    });
  } catch (error) {
    console.error('Get child progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Get parent's lessons (all children's lessons)
router.get('/parent/lessons', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { status, child_id } = req.query;

    let sql = `
      SELECT lb.*, l.name as language_name,
             CONCAT(educator.first_name, ' ', educator.last_name) as educator_name,
             educator.avatar_url as educator_avatar,
             CONCAT(student.first_name, ' ', student.last_name) as child_name
      FROM lesson_bookings lb
      JOIN languages l ON lb.language_id = l.id
      LEFT JOIN users educator ON lb.educator_id = educator.id
      JOIN users student ON lb.student_id = student.id
      JOIN parent_child_links pcl ON student.id = pcl.child_id
      WHERE pcl.parent_id = ?
    `;
    const params = [req.user.id];

    if (status && status !== 'all') {
      sql += ' AND lb.status = ?';
      params.push(status);
    }

    if (child_id) {
      sql += ' AND lb.student_id = ?';
      params.push(child_id);
    }

    sql += ' ORDER BY lb.scheduled_date DESC, lb.scheduled_time DESC LIMIT 50';

    const lessons = await query(sql, params);

    res.json({ lessons });
  } catch (error) {
    console.error('Parent lessons error:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Update parent profile
router.put('/parent/profile', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { firstName, lastName, phone, timezone } = req.body;

    await query(`
      UPDATE users SET first_name = ?, last_name = ?, phone = ?, timezone = ?
      WHERE id = ?
    `, [firstName, lastName, phone || null, timezone || 'America/New_York', req.user.id]);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update notification preferences
router.put('/parent/notifications', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const preferences = JSON.stringify(req.body);

    await query(`
      UPDATE users SET notification_preferences = ? WHERE id = ?
    `, [preferences, req.user.id]);

    res.json({ message: 'Notification preferences updated' });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Change password
router.put('/parent/password', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const bcrypt = require('bcryptjs');

    // Verify current password
    const users = await query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, users[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Update password
    const hash = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id]);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Get billing information
router.get('/parent/billing', authenticate, requireRole('parent', 'admin'), async (req, res) => {
  try {
    // Return default billing info (tables may not exist yet)
    // In production, you would query actual subscription tables
    res.json({
      currentPlan: {
        name: 'Free Trial',
        price: 0,
        lessonsPerMonth: 3,
        lessonsUsed: 0
      },
      balance: 0,
      nextBillingDate: null,
      paymentMethod: null,
      invoices: [],
      lessonCredits: 0
    });
  } catch (error) {
    console.error('Billing fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch billing information' });
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
