const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const path = require('path');
const db = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const donationRoutes = require('./routes/donations');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/users');
const lessonRoutes = require('./routes/lessons');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const mediaRoutes = require('./routes/media');
const contentRoutes = require('./routes/content');
const portalRoutes = require('./routes/portal');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['https://ispeak-app-prod.vercel.app', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// One-time seed endpoint (for initial setup only)
app.post('/seed-data', async (req, res) => {
  try {
    const { query } = require('./config/database');

    // Check if products already exist
    const existingProducts = await query('SELECT COUNT(*) as count FROM products');
    if (existingProducts[0].count > 0) {
      return res.status(400).json({ error: 'Data already seeded', productCount: existingProducts[0].count });
    }

    // Seed products
    await query(`
      INSERT INTO products (name, slug, description, short_description, price, category_id, images, featured_image, stock_quantity, status, featured) VALUES
      ('iSPEAK Language T-Shirt', 'ispeak-language-tshirt', 'Premium cotton t-shirt featuring African language motifs. Available in multiple sizes.', 'Premium cotton t-shirt with African language designs', 29.99, 1, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"]', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 100, 'active', TRUE),
      ('Yoruba Flashcard Set', 'yoruba-flashcard-set', 'Complete set of 100 Yoruba vocabulary flashcards for beginners. Includes pronunciation guide.', '100 Yoruba vocabulary flashcards', 24.99, 2, '["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400"]', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', 50, 'active', TRUE),
      ('Kiswahili Learning Book', 'kiswahili-learning-book', 'Comprehensive Kiswahili learning guide for children ages 6-12. Colorful illustrations and activities.', 'Kiswahili guide for children 6-12', 34.99, 2, '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"]', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 75, 'active', TRUE),
      ('African Heritage Backpack', 'african-heritage-backpack', 'Stylish backpack with traditional African patterns. Perfect for school or travel.', 'Backpack with traditional African patterns', 49.99, 3, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"]', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 30, 'active', TRUE),
      ('Twi Language Notebook', 'twi-language-notebook', 'Premium lined notebook with Twi vocabulary sections and practice pages.', 'Premium notebook for Twi practice', 12.99, 4, '["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400"]', 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400', 200, 'active', FALSE),
      ('Amharic Alphabet Puzzle', 'amharic-alphabet-puzzle', 'Educational wooden puzzle featuring the Amharic alphabet. Great for ages 3-8.', 'Wooden puzzle with Amharic alphabet', 19.99, 5, '["https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400"]', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', 45, 'active', TRUE),
      ('iSPEAK Hoodie', 'ispeak-hoodie', 'Comfortable pullover hoodie with iSPEAK logo. Perfect for cool weather learning sessions.', 'Comfortable hoodie with iSPEAK logo', 54.99, 1, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"]', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 60, 'active', FALSE),
      ('Language Sticker Pack', 'language-sticker-pack', 'Fun sticker pack with African language greetings and phrases. 50 stickers included.', '50 stickers with African greetings', 8.99, 3, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"]', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 500, 'active', FALSE)
    `);

    // Seed blog posts
    await query(`
      INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category_id, author_name, is_published, published_at, views) VALUES
      ('Why Learning African Languages Matters', 'why-learning-african-languages-matters', 'Discover the incredible benefits of learning African languages for children and how it connects them to their heritage.', '<p>Learning African languages offers children a unique opportunity to connect with their heritage while developing valuable cognitive skills.</p><p>Research shows that bilingual children often demonstrate enhanced problem-solving abilities, improved memory, and greater cultural awareness.</p>', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 1, 'Dr. Amara Johnson', TRUE, NOW() - INTERVAL 5 DAY, 245),
      ('Tips for Parents: Supporting Language Learning at Home', 'tips-parents-supporting-language-learning', 'Practical strategies for parents to reinforce African language learning outside of lesson time.', '<p>As a parent, you play a crucial role in your child''s language learning journey. Here are some proven strategies to support their progress at home.</p><p>Create a language-rich environment by labeling items around your home in the target language.</p>', 'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800', 3, 'Maria Okonkwo', TRUE, NOW() - INTERVAL 3 DAY, 189),
      ('Celebrating Yoruba Culture Through Language', 'celebrating-yoruba-culture-through-language', 'Explore the rich cultural heritage of the Yoruba people and how language preservation keeps traditions alive.', '<p>The Yoruba language is more than just words—it is a gateway to understanding one of Africa''s most vibrant cultures.</p><p>From proverbs to songs, every aspect of Yoruba language carries centuries of wisdom and tradition.</p>', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800', 2, 'Chief Adebayo Williams', TRUE, NOW() - INTERVAL 1 DAY, 312)
    `);

    res.json({ message: 'Sample data seeded successfully', products: 8, blogPosts: 3 });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed data', details: error.message });
  }
});

// Add more blog posts endpoint
app.post('/seed-blogs', async (req, res) => {
  try {
    const { query } = require('./config/database');
    const { blogs } = req.body;

    if (!blogs || !Array.isArray(blogs)) {
      return res.status(400).json({ error: 'blogs array required' });
    }

    const inserted = [];
    for (const blog of blogs) {
      // Check if slug exists
      const existing = await query('SELECT id FROM blog_posts WHERE slug = ?', [blog.slug]);
      if (existing.length > 0) {
        inserted.push({ slug: blog.slug, status: 'exists', id: existing[0].id });
        continue;
      }

      const result = await query(`
        INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category_id, author_name, is_published, published_at, views)
        VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, NOW(), 0)
      `, [blog.title, blog.slug, blog.excerpt, blog.content, blog.featured_image, blog.category_id || 1, blog.author_name || 'iSPEAK Team']);

      inserted.push({ slug: blog.slug, status: 'created', id: result.insertId });
    }

    res.json({ message: 'Blogs processed', results: inserted });
  } catch (error) {
    console.error('Seed blogs error:', error);
    res.status(500).json({ error: 'Failed to seed blogs', details: error.message });
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/portal', portalRoutes);

// Database migration endpoint for media library table
app.post('/migrate-media', async (req, res) => {
  try {
    const { query } = require('./config/database');

    await query(`
      CREATE TABLE IF NOT EXISTS media_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        file_path VARCHAR(500),
        url VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100),
        file_size INT,
        width INT,
        height INT,
        alt_text VARCHAR(255),
        title VARCHAR(255),
        description TEXT,
        folder VARCHAR(100) DEFAULT 'uploads',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_folder (folder),
        INDEX idx_mime_type (mime_type),
        INDEX idx_created_at (created_at)
      )
    `);

    res.json({ message: 'Media library table created successfully' });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Migration failed', details: error.message });
  }
});

// Full platform migration endpoint (inline SQL for container compatibility)
app.post('/migrate-platform', async (req, res) => {
  try {
    const { query } = require('./config/database');
    const results = [];

    // Create languages table
    try {
      await query(`
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
        )
      `);
      results.push({ table: 'languages', status: 'created' });
    } catch (err) {
      results.push({ table: 'languages', status: 'exists or error', error: err.message });
    }

    // Create pricing_plans table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS pricing_plans (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          slug VARCHAR(50) UNIQUE NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'USD',
          billing_period ENUM('monthly', 'quarterly', 'yearly', 'one-time') DEFAULT 'monthly',
          features JSON,
          is_popular BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'pricing_plans', status: 'created' });
    } catch (err) {
      results.push({ table: 'pricing_plans', status: 'exists or error', error: err.message });
    }

    // Create faqs table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS faqs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          category VARCHAR(100),
          display_order INT DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'faqs', status: 'created' });
    } catch (err) {
      results.push({ table: 'faqs', status: 'exists or error', error: err.message });
    }

    // Create testimonials table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(100),
          location VARCHAR(100),
          content TEXT NOT NULL,
          rating INT DEFAULT 5,
          avatar_url VARCHAR(255),
          language_id INT,
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'testimonials', status: 'created' });
    } catch (err) {
      results.push({ table: 'testimonials', status: 'exists or error', error: err.message });
    }

    // Create team_members table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS team_members (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(100) NOT NULL,
          bio TEXT,
          photo_url VARCHAR(255),
          languages JSON,
          specializations JSON,
          email VARCHAR(255),
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'team_members', status: 'created' });
    } catch (err) {
      results.push({ table: 'team_members', status: 'exists or error', error: err.message });
    }

    // Create content_blocks table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS content_blocks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          page VARCHAR(100) NOT NULL,
          section VARCHAR(100) NOT NULL,
          block_key VARCHAR(100) NOT NULL,
          content_type ENUM('text', 'html', 'image', 'json') DEFAULT 'text',
          content TEXT,
          metadata JSON,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_block (page, section, block_key)
        )
      `);
      results.push({ table: 'content_blocks', status: 'created' });
    } catch (err) {
      results.push({ table: 'content_blocks', status: 'exists or error', error: err.message });
    }

    // Create student_progress table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS student_progress (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          language_id INT NOT NULL,
          current_level ENUM('beginner', 'elementary', 'intermediate', 'advanced') DEFAULT 'beginner',
          total_lessons_completed INT DEFAULT 0,
          total_practice_minutes INT DEFAULT 0,
          vocabulary_learned INT DEFAULT 0,
          current_streak_days INT DEFAULT 0,
          longest_streak_days INT DEFAULT 0,
          last_activity_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_user_language (user_id, language_id)
        )
      `);
      results.push({ table: 'student_progress', status: 'created' });
    } catch (err) {
      results.push({ table: 'student_progress', status: 'exists or error', error: err.message });
    }

    // Create achievements table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS achievements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          icon VARCHAR(100),
          category VARCHAR(50),
          points INT DEFAULT 0,
          criteria JSON,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'achievements', status: 'created' });
    } catch (err) {
      results.push({ table: 'achievements', status: 'exists or error', error: err.message });
    }

    // Create user_achievements table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS user_achievements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          achievement_id INT NOT NULL,
          earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_user_achievement (user_id, achievement_id)
        )
      `);
      results.push({ table: 'user_achievements', status: 'created' });
    } catch (err) {
      results.push({ table: 'user_achievements', status: 'exists or error', error: err.message });
    }

    // Create learning_modules table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS learning_modules (
          id INT AUTO_INCREMENT PRIMARY KEY,
          language_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(100) NOT NULL,
          description TEXT,
          level ENUM('beginner', 'elementary', 'intermediate', 'advanced') DEFAULT 'beginner',
          module_order INT DEFAULT 0,
          estimated_hours DECIMAL(4,1),
          icon VARCHAR(100),
          is_published BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_language_module (language_id, slug)
        )
      `);
      results.push({ table: 'learning_modules', status: 'created' });
    } catch (err) {
      results.push({ table: 'learning_modules', status: 'exists or error', error: err.message });
    }

    // Create learning_lessons table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS learning_lessons (
          id INT AUTO_INCREMENT PRIMARY KEY,
          module_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(100) NOT NULL,
          description TEXT,
          content JSON,
          lesson_order INT DEFAULT 0,
          duration_minutes INT DEFAULT 30,
          lesson_type ENUM('video', 'interactive', 'reading', 'practice', 'quiz') DEFAULT 'interactive',
          is_published BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_module_lesson (module_id, slug)
        )
      `);
      results.push({ table: 'learning_lessons', status: 'created' });
    } catch (err) {
      results.push({ table: 'learning_lessons', status: 'exists or error', error: err.message });
    }

    // Create user_lesson_progress table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS user_lesson_progress (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          lesson_id INT NOT NULL,
          status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
          score DECIMAL(5,2),
          time_spent_minutes INT DEFAULT 0,
          completed_at TIMESTAMP NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_user_lesson (user_id, lesson_id)
        )
      `);
      results.push({ table: 'user_lesson_progress', status: 'created' });
    } catch (err) {
      results.push({ table: 'user_lesson_progress', status: 'exists or error', error: err.message });
    }

    // Create notifications table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS notifications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          message TEXT,
          type ENUM('info', 'success', 'warning', 'reminder', 'achievement') DEFAULT 'info',
          is_read BOOLEAN DEFAULT FALSE,
          action_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'notifications', status: 'created' });
    } catch (err) {
      results.push({ table: 'notifications', status: 'exists or error', error: err.message });
    }

    // Create messages table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          sender_id INT NOT NULL,
          recipient_id INT NOT NULL,
          subject VARCHAR(255),
          content TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          parent_message_id INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      results.push({ table: 'messages', status: 'created' });
    } catch (err) {
      results.push({ table: 'messages', status: 'exists or error', error: err.message });
    }

    // Now seed initial data
    // Seed languages
    try {
      const existingLangs = await query('SELECT COUNT(*) as count FROM languages');
      if (existingLangs[0].count === 0) {
        await query(`
          INSERT INTO languages (name, native_name, slug, description, region, display_order) VALUES
          ('Yoruba', 'Èdè Yorùbá', 'yoruba', 'A language spoken by the Yoruba people in West Africa, primarily in Nigeria and Benin.', 'West Africa', 1),
          ('Kiswahili', 'Kiswahili', 'kiswahili', 'A Bantu language widely spoken in East Africa, the lingua franca of the region.', 'East Africa', 2),
          ('Twi', 'Twi', 'twi', 'An Akan language spoken in Ghana, part of the Kwa language family.', 'West Africa', 3),
          ('Amharic', 'አማርኛ', 'amharic', 'The official language of Ethiopia, a Semitic language with its own unique script.', 'East Africa', 4)
        `);
        results.push({ seed: 'languages', status: 'seeded', count: 4 });
      }
    } catch (err) {
      results.push({ seed: 'languages', status: 'error', error: err.message });
    }

    // Seed pricing plans
    try {
      const existingPlans = await query('SELECT COUNT(*) as count FROM pricing_plans');
      if (existingPlans[0].count === 0) {
        await query(`
          INSERT INTO pricing_plans (name, slug, description, price, billing_period, features, is_popular, display_order) VALUES
          ('Explorer', 'explorer', 'Perfect for trying out language learning', 49.00, 'monthly', '["2 live lessons per month", "Basic vocabulary access", "Email support", "Progress tracking"]', FALSE, 1),
          ('Adventurer', 'adventurer', 'Most popular choice for serious learners', 99.00, 'monthly', '["4 live lessons per month", "Full curriculum access", "Priority scheduling", "Progress reports", "Parent dashboard", "Chat support"]', TRUE, 2),
          ('Champion', 'champion', 'Intensive learning for fast progress', 179.00, 'monthly', '["8 live lessons per month", "Full curriculum access", "Flexible scheduling", "Detailed analytics", "Parent dashboard", "Priority support", "Cultural immersion sessions"]', FALSE, 3)
        `);
        results.push({ seed: 'pricing_plans', status: 'seeded', count: 3 });
      }
    } catch (err) {
      results.push({ seed: 'pricing_plans', status: 'error', error: err.message });
    }

    // Seed FAQs
    try {
      const existingFaqs = await query('SELECT COUNT(*) as count FROM faqs');
      if (existingFaqs[0].count === 0) {
        await query(`
          INSERT INTO faqs (question, answer, category, display_order) VALUES
          ('What age groups do you teach?', 'We offer specialized programs for children ages 3-14, with age-appropriate curriculum and teaching methods for each group.', 'General', 1),
          ('How do the online lessons work?', 'Lessons are conducted via secure video conferencing with native-speaking educators. Each session is interactive and engaging.', 'Lessons', 2),
          ('What languages do you offer?', 'We currently offer Yoruba, Kiswahili, Twi, and Amharic, with plans to add more African languages.', 'Languages', 3),
          ('Can parents monitor progress?', 'Yes! Parents have access to a dedicated dashboard showing lesson history, progress reports, and upcoming sessions.', 'Parents', 4),
          ('What if we need to reschedule?', 'You can reschedule lessons up to 24 hours in advance through your dashboard at no additional cost.', 'Scheduling', 5),
          ('Do you offer trial lessons?', 'Yes, we offer a free trial lesson so you can experience our teaching approach before committing.', 'General', 6)
        `);
        results.push({ seed: 'faqs', status: 'seeded', count: 6 });
      }
    } catch (err) {
      results.push({ seed: 'faqs', status: 'error', error: err.message });
    }

    // Seed testimonials
    try {
      const existingTest = await query('SELECT COUNT(*) as count FROM testimonials');
      if (existingTest[0].count === 0) {
        await query(`
          INSERT INTO testimonials (name, role, location, content, rating, is_featured, display_order) VALUES
          ('Sarah Johnson', 'Parent', 'Atlanta, GA', 'My daughter has been learning Yoruba for 6 months and the progress is amazing. The teachers are so patient and make learning fun!', 5, TRUE, 1),
          ('Michael Okonkwo', 'Parent', 'Houston, TX', 'As a Nigerian-American, it was important for my kids to connect with their heritage. iSPEAK made it possible and enjoyable.', 5, TRUE, 2),
          ('Jennifer Williams', 'Parent', 'New York, NY', 'The flexibility of scheduling and quality of instruction exceeded our expectations. Highly recommend!', 5, TRUE, 3),
          ('David Mensah', 'Parent', 'Chicago, IL', 'My son loves his Twi lessons. The cultural elements incorporated into teaching make it so much more meaningful.', 5, FALSE, 4)
        `);
        results.push({ seed: 'testimonials', status: 'seeded', count: 4 });
      }
    } catch (err) {
      results.push({ seed: 'testimonials', status: 'error', error: err.message });
    }

    res.json({
      message: 'Platform migration completed successfully',
      results: results
    });
  } catch (error) {
    console.error('Platform migration error:', error);
    res.status(500).json({ error: 'Migration failed', details: error.message });
  }
});

// Portal tables migration
app.post('/migrate-portals', async (req, res) => {
  try {
    const { query } = require('./config/database');
    const results = [];

    // Create lesson_bookings table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS lesson_bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT NOT NULL,
          educator_id INT,
          language_id INT NOT NULL,
          scheduled_date DATE NOT NULL,
          scheduled_time TIME NOT NULL,
          duration_minutes INT DEFAULT 30,
          status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no-show') DEFAULT 'pending',
          student_notes TEXT,
          educator_notes TEXT,
          cancellation_reason TEXT,
          meeting_link VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_student (student_id),
          INDEX idx_educator (educator_id),
          INDEX idx_date (scheduled_date),
          INDEX idx_status (status)
        )
      `);
      results.push({ table: 'lesson_bookings', status: 'created' });
    } catch (err) {
      results.push({ table: 'lesson_bookings', status: 'exists or error', error: err.message });
    }

    // Create parent_child_links table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS parent_child_links (
          id INT AUTO_INCREMENT PRIMARY KEY,
          parent_id INT NOT NULL,
          child_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_link (parent_id, child_id),
          INDEX idx_parent (parent_id),
          INDEX idx_child (child_id)
        )
      `);
      results.push({ table: 'parent_child_links', status: 'created' });
    } catch (err) {
      results.push({ table: 'parent_child_links', status: 'exists or error', error: err.message });
    }

    // Create educator_availability table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS educator_availability (
          id INT AUTO_INCREMENT PRIMARY KEY,
          educator_id INT NOT NULL,
          day_of_week INT NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          is_available BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_educator (educator_id)
        )
      `);
      results.push({ table: 'educator_availability', status: 'created' });
    } catch (err) {
      results.push({ table: 'educator_availability', status: 'exists or error', error: err.message });
    }

    // Create educator_languages table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS educator_languages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          educator_id INT NOT NULL,
          language_id INT NOT NULL,
          proficiency ENUM('native', 'fluent', 'advanced') DEFAULT 'fluent',
          is_primary BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_educator_language (educator_id, language_id)
        )
      `);
      results.push({ table: 'educator_languages', status: 'created' });
    } catch (err) {
      results.push({ table: 'educator_languages', status: 'exists or error', error: err.message });
    }

    // Create lesson_reviews table
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS lesson_reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          booking_id INT NOT NULL,
          student_id INT NOT NULL,
          educator_id INT NOT NULL,
          rating INT NOT NULL,
          review_text TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_booking_review (booking_id)
        )
      `);
      results.push({ table: 'lesson_reviews', status: 'created' });
    } catch (err) {
      results.push({ table: 'lesson_reviews', status: 'exists or error', error: err.message });
    }

    // Add role column to users if not exists
    try {
      await query(`
        ALTER TABLE users
        MODIFY COLUMN role ENUM('customer', 'student', 'parent', 'educator', 'admin') DEFAULT 'customer'
      `);
      results.push({ alter: 'users.role', status: 'updated' });
    } catch (err) {
      results.push({ alter: 'users.role', status: 'already updated or error', error: err.message });
    }

    res.json({
      message: 'Portal tables migration completed',
      results: results
    });
  } catch (error) {
    console.error('Portal migration error:', error);
    res.status(500).json({ error: 'Migration failed', details: error.message });
  }
});

// Seed test data endpoint
app.post('/seed-test-data', async (req, res) => {
  try {
    const results = [];

    // Update educator user role
    await query("UPDATE users SET role = 'educator' WHERE email = 'educator@ispeak.test'");
    results.push({ action: 'Update educator role', status: 'done' });

    // Create parent user if not exists
    try {
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash('TestPass123', 10);
      await query(
        "INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, 'parent') ON DUPLICATE KEY UPDATE role = 'parent'",
        ['parent@ispeak.test', hash, 'Test', 'Parent']
      );
      results.push({ action: 'Create parent user', status: 'done' });
    } catch (err) {
      results.push({ action: 'Create parent user', status: 'exists or error', error: err.message });
    }

    // Link educator to Yoruba language
    try {
      const educators = await query("SELECT id FROM users WHERE email = 'educator@ispeak.test'");
      if (educators.length > 0) {
        await query(
          "INSERT INTO educator_languages (educator_id, language_id, proficiency, is_primary) VALUES (?, 1, 'native', true) ON DUPLICATE KEY UPDATE proficiency = 'native'",
          [educators[0].id]
        );
        results.push({ action: 'Link educator to Yoruba', status: 'done' });
      }
    } catch (err) {
      results.push({ action: 'Link educator to language', status: 'error', error: err.message });
    }

    res.json({ message: 'Test data seeded', results });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Seeding failed', details: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`iSPEAK API Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS enabled for: ${corsOptions.origin}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  db.pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});
