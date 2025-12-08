-- iSPEAK Complete Database Schema Migration
-- Run this to create all necessary tables for the complete platform
-- Version: 1.0.0
-- Date: December 8, 2025

-- =============================================
-- CONTENT MANAGEMENT TABLES
-- =============================================

-- Languages offered by iSPEAK
CREATE TABLE IF NOT EXISTS languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100),
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  flag_icon VARCHAR(255),
  region VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed initial languages
INSERT INTO languages (name, native_name, slug, description, region, display_order) VALUES
('Yoruba', 'Èdè Yorùbá', 'yoruba', 'One of the largest languages spoken in West Africa, primarily in Nigeria and Benin.', 'West Africa', 1),
('Kiswahili', 'Kiswahili', 'kiswahili', 'A Bantu language widely spoken across East Africa, including Kenya, Tanzania, and Uganda.', 'East Africa', 2),
('Twi', 'Twi', 'twi', 'An Akan language spoken in Ghana, one of the most widely spoken languages in the country.', 'West Africa', 3),
('Amharic', 'አማርኛ', 'amharic', 'The official language of Ethiopia and one of the most widely spoken languages in the Horn of Africa.', 'East Africa', 4)
ON DUPLICATE KEY UPDATE name=name;

-- Pricing Plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  billing_period ENUM('single', 'weekly', 'monthly', 'quarterly', 'yearly') DEFAULT 'monthly',
  lessons_included INT,
  duration_months INT DEFAULT 1,
  features JSON,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed initial pricing plans
INSERT INTO pricing_plans (name, slug, description, price, billing_period, lessons_included, features, is_popular, display_order) VALUES
('Single Lesson', 'single-lesson', 'Perfect for trying out our service', 25.00, 'single', 1, '["30-minute live lesson", "Native speaker educator", "Lesson materials included", "Progress report"]', FALSE, 1),
('Monthly Basic', 'monthly-basic', 'Great for consistent weekly practice', 75.00, 'monthly', 4, '["4 x 30-minute lessons", "Native speaker educator", "Lesson materials included", "Monthly progress report", "Email support"]', FALSE, 2),
('Monthly Premium', 'monthly-premium', 'Our most popular plan for serious learners', 90.00, 'monthly', 4, '["4 x 30-minute lessons", "Choose your educator", "Custom lesson plans", "Weekly progress reports", "Priority support", "Access to learning materials"]', TRUE, 3),
('3-Month Immersion', 'quarterly-immersion', 'Intensive language learning experience', 350.00, 'quarterly', 16, '["16 x 30-minute lessons", "Dedicated educator", "Personalized curriculum", "Weekly progress reports", "Priority support", "Full resource library access", "Cultural immersion content", "Certificate of completion"]', FALSE, 4)
ON DUPLICATE KEY UPDATE name=name;

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_active (is_active)
);

-- Seed initial FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('What ages do you teach?', 'iSPEAK teaches children ages 3-14. Our curriculum is specifically designed for young learners with age-appropriate content, games, and activities.', 'general', 1),
('How long are the lessons?', 'Each lesson is 30 minutes long, which is the optimal duration for maintaining children''s attention and engagement while ensuring effective learning.', 'lessons', 2),
('What languages do you offer?', 'We currently offer lessons in Yoruba, Kiswahili, Twi, and Amharic. These are some of the most widely spoken African languages.', 'languages', 3),
('Are the teachers native speakers?', 'Yes! All our educators are native speakers who have been carefully vetted for their language proficiency, teaching ability, and experience working with children.', 'educators', 4),
('What platform do you use for lessons?', 'Lessons are conducted via Zoom or Google Meet. You''ll receive a meeting link before each scheduled lesson.', 'technical', 5),
('Can I reschedule a lesson?', 'Yes, you can reschedule lessons with at least 24 hours notice. Same-day cancellations may not be refunded.', 'booking', 6),
('Do you offer a free trial?', 'Yes! We offer a free 15-minute trial lesson so you and your child can experience our teaching method before committing.', 'general', 7),
('What happens if my child misses a lesson?', 'If you provide 24 hours notice, you can reschedule the lesson. Lessons missed without notice may be forfeited depending on your plan terms.', 'booking', 8)
ON DUPLICATE KEY UPDATE question=question;

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  location VARCHAR(100),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  avatar_url VARCHAR(500),
  language_id INT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL,
  INDEX idx_featured (is_featured),
  INDEX idx_active (is_active)
);

-- Seed initial testimonials
INSERT INTO testimonials (name, role, location, content, rating, language_id, is_featured) VALUES
('Sarah Johnson', 'Parent', 'Atlanta, GA', 'My daughter has been taking Yoruba lessons for 6 months now and her progress is amazing! She loves her teacher and looks forward to every lesson.', 5, 1, TRUE),
('Michael Okonkwo', 'Parent', 'Houston, TX', 'As a Nigerian-American, it was important for us to connect our kids with their heritage. iSPEAK made it possible and fun!', 5, 1, TRUE),
('Amanda Williams', 'Parent', 'New York, NY', 'The Kiswahili lessons have been wonderful. Our teacher is patient, engaging, and really connects with the kids.', 5, 2, TRUE),
('David Mensah', 'Parent', 'London, UK', 'We wanted our children to learn Twi to communicate with their grandparents. After 3 months, they can have basic conversations!', 5, 3, FALSE)
ON DUPLICATE KEY UPDATE name=name;

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  bio TEXT,
  photo_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  email VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Content Blocks (for CMS-managed content)
CREATE TABLE IF NOT EXISTS content_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  block_key VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(500),
  content TEXT,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  button_text VARCHAR(100),
  button_url VARCHAR(500),
  metadata JSON,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_block (page_slug, block_key),
  INDEX idx_page (page_slug)
);

-- Seed homepage content blocks
INSERT INTO content_blocks (page_slug, block_key, title, subtitle, content, video_url, button_text, button_url, display_order) VALUES
('home', 'video-section', 'Meet Paji, Your Language Guide', 'Paji is the friendly guide who will accompany your child throughout their language learning journey', NULL, 'https://www.youtube.com/embed/z10PGLGL8lY', NULL, NULL, 1),
('home', 'mission-section', 'Our Mission', NULL, 'iSPEAK has partnered with several community-based organizations and initiatives to support efforts aligned with our mission of preserving and promoting African languages and cultures. Through these collaborative partnerships, we work together to strengthen indigenous language communities and create meaningful educational opportunities.', NULL, 'Support Our Mission', '/donate', 2),
('home', 'shop-section', 'Paji Shop', NULL, 'Enhance your child''s learning experience with carefully curated cultural materials from the Paji Shop. Browse our collection of children''s books, educational toys, and exclusive resources designed to reinforce language learning outside of lessons.', NULL, 'Visit Shop', '/shop', 3),
('home', 'method-intro', 'The iSPEAK Method', 'iSPEAK uses a research-based three-pillar approach to language acquisition.', 'Each lesson is carefully crafted to develop essential language skills through engaging, age-appropriate activities that keep children motivated and excited to learn.', '/images/generated/ispeak-method-pillars.jpg', NULL, NULL, 4),
('home', 'pillar-listening', 'Listening Skills', NULL, 'Each lesson provides opportunities for learners to hear authentic language. Children develop skills to recognize sounds, understand tones, and comprehend meanings.', NULL, NULL, NULL, 5),
('home', 'pillar-speaking', 'Speaking Practice', NULL, 'Interactive conversations with native speakers help children develop proper pronunciation, build vocabulary, and gain confidence in verbal communication.', NULL, NULL, NULL, 6),
('home', 'pillar-culture', 'Cultural Connection', NULL, 'Language learning is enriched with cultural context. Children explore traditions, stories, music, and customs that bring the language to life.', NULL, NULL, NULL, 7)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- =============================================
-- USER & AUTHENTICATION ENHANCEMENTS
-- =============================================

-- Add columns to users table if they don't exist
-- (These may already exist, so we use conditional adds)

-- Check and add avatar_url column
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'avatar_url');
SET @sql = IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500) AFTER phone',
  'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check and add timezone column
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'timezone');
SET @sql = IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN timezone VARCHAR(50) DEFAULT ''America/New_York'' AFTER avatar_url',
  'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check and add last_login column
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'last_login');
SET @sql = IF(@column_exists = 0,
  'ALTER TABLE users ADD COLUMN last_login TIMESTAMP NULL',
  'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =============================================
-- STUDENT MANAGEMENT TABLES
-- =============================================

-- Update students table structure if needed
-- (Assuming students table exists from lessons.js references)

-- Student Progress Tracking
CREATE TABLE IF NOT EXISTS student_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  language_id INT NOT NULL,
  skill_type ENUM('listening', 'speaking', 'vocabulary', 'culture', 'overall') NOT NULL,
  level INT DEFAULT 1,
  points INT DEFAULT 0,
  last_activity_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
  UNIQUE KEY unique_progress (student_id, language_id, skill_type),
  INDEX idx_student (student_id),
  INDEX idx_language (language_id)
);

-- Student Achievements/Badges
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  badge_image VARCHAR(500),
  points_required INT DEFAULT 0,
  type ENUM('milestone', 'streak', 'skill', 'special') DEFAULT 'milestone',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed achievements
INSERT INTO achievements (name, slug, description, icon, points_required, type) VALUES
('First Lesson', 'first-lesson', 'Completed your first lesson', 'fas fa-star', 0, 'milestone'),
('Week Warrior', 'week-warrior', 'Completed lessons for 7 days in a row', 'fas fa-fire', 0, 'streak'),
('Word Wizard', 'word-wizard', 'Learned 50 new vocabulary words', 'fas fa-book', 50, 'skill'),
('Conversation Champion', 'conversation-champion', 'Had 10 full conversations in target language', 'fas fa-comments', 0, 'milestone'),
('Cultural Explorer', 'cultural-explorer', 'Completed 5 cultural lessons', 'fas fa-globe-africa', 0, 'skill'),
('Listening Legend', 'listening-legend', 'Achieved advanced listening comprehension', 'fas fa-headphones', 100, 'skill'),
('Month Master', 'month-master', 'Maintained learning streak for 30 days', 'fas fa-calendar-check', 0, 'streak'),
('Rising Star', 'rising-star', 'Earned 500 total points', 'fas fa-trophy', 500, 'milestone')
ON DUPLICATE KEY UPDATE name=name;

-- Student-Achievement Junction
CREATE TABLE IF NOT EXISTS student_achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  achievement_id INT NOT NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
  UNIQUE KEY unique_student_achievement (student_id, achievement_id),
  INDEX idx_student (student_id)
);

-- =============================================
-- EDUCATOR MANAGEMENT ENHANCEMENTS
-- =============================================

-- Educator Availability Schedule
CREATE TABLE IF NOT EXISTS educator_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  educator_id INT NOT NULL,
  day_of_week TINYINT NOT NULL, -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone VARCHAR(50) DEFAULT 'UTC',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_educator (educator_id),
  INDEX idx_day (day_of_week)
);

-- Educator Reviews (separate from lesson feedback)
CREATE TABLE IF NOT EXISTS educator_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  educator_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_educator (educator_id),
  INDEX idx_approved (is_approved)
);

-- =============================================
-- LEARNING MANAGEMENT SYSTEM (LMS) TABLES
-- =============================================

-- Learning Modules
CREATE TABLE IF NOT EXISTS learning_modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  language_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  level ENUM('beginner', 'elementary', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  age_group ENUM('3-5', '6-8', '9-11', '12-14', 'all') NOT NULL DEFAULT 'all',
  thumbnail_url VARCHAR(500),
  estimated_hours INT DEFAULT 1,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
  UNIQUE KEY unique_module_slug (language_id, slug),
  INDEX idx_language (language_id),
  INDEX idx_level (level),
  INDEX idx_age (age_group)
);

-- Learning Lessons (within modules)
CREATE TABLE IF NOT EXISTS learning_lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  content JSON, -- Structured content: videos, text, exercises
  lesson_type ENUM('video', 'vocabulary', 'listening', 'speaking', 'quiz', 'culture') DEFAULT 'video',
  duration_minutes INT DEFAULT 10,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES learning_modules(id) ON DELETE CASCADE,
  UNIQUE KEY unique_lesson (module_id, slug),
  INDEX idx_module (module_id)
);

-- Student Module Progress
CREATE TABLE IF NOT EXISTS module_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  module_id INT NOT NULL,
  lessons_completed INT DEFAULT 0,
  total_time_minutes INT DEFAULT 0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (module_id) REFERENCES learning_modules(id) ON DELETE CASCADE,
  UNIQUE KEY unique_progress (student_id, module_id),
  INDEX idx_student (student_id)
);

-- Student Lesson Completion
CREATE TABLE IF NOT EXISTS lesson_completions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  lesson_id INT NOT NULL,
  score INT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  attempts INT DEFAULT 1,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES learning_lessons(id) ON DELETE CASCADE,
  UNIQUE KEY unique_completion (student_id, lesson_id),
  INDEX idx_student (student_id)
);

-- =============================================
-- BOOKING & SCHEDULING ENHANCEMENTS
-- =============================================

-- Lesson Credits (for subscription management)
CREATE TABLE IF NOT EXISTS lesson_credits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  credits_total INT NOT NULL DEFAULT 0,
  credits_used INT NOT NULL DEFAULT 0,
  plan_id INT,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_expires (expires_at)
);

-- Booking Time Slots (blocked times, holidays, etc.)
CREATE TABLE IF NOT EXISTS blocked_times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  educator_id INT,
  reason VARCHAR(255),
  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_educator (educator_id),
  INDEX idx_times (start_datetime, end_datetime)
);

-- =============================================
-- NOTIFICATIONS & MESSAGING
-- =============================================

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL, -- lesson_reminder, booking_confirmed, achievement_earned, etc.
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link VARCHAR(500),
  metadata JSON,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (is_read),
  INDEX idx_type (type)
);

-- Messages (Parent-Educator communication)
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  parent_message_id INT, -- For threading
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE SET NULL,
  INDEX idx_sender (sender_id),
  INDEX idx_recipient (recipient_id),
  INDEX idx_read (is_read)
);

-- =============================================
-- ACTIVITY LOGGING
-- =============================================

-- Activity Log (for analytics and audit)
CREATE TABLE IF NOT EXISTS activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- lesson, module, product, etc.
  entity_id INT,
  metadata JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created (created_at)
);

-- =============================================
-- COMPLETED
-- =============================================

SELECT 'Migration completed successfully!' AS status;
