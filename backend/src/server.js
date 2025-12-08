const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

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
