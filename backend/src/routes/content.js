const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// =============================================
// LANGUAGES
// =============================================

// Get all languages (public)
router.get('/languages', async (req, res) => {
  try {
    const { active_only = 'true' } = req.query;

    let sql = 'SELECT * FROM languages';
    if (active_only === 'true') {
      sql += ' WHERE is_active = TRUE';
    }
    sql += ' ORDER BY display_order ASC, name ASC';

    const languages = await query(sql);
    res.json(languages);
  } catch (error) {
    console.error('Languages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// Get single language
router.get('/languages/:slug', async (req, res) => {
  try {
    const languages = await query('SELECT * FROM languages WHERE slug = ?', [req.params.slug]);

    if (languages.length === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }

    res.json(languages[0]);
  } catch (error) {
    console.error('Language fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch language' });
  }
});

// Create language (admin only)
router.post('/languages', authenticate, adminOnly, [
  body('name').trim().notEmpty(),
  body('slug').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, native_name, slug, description, flag_icon, region, is_active, display_order } = req.body;

    const result = await query(`
      INSERT INTO languages (name, native_name, slug, description, flag_icon, region, is_active, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, native_name, slug, description, flag_icon, region, is_active !== false, display_order || 0]);

    res.status(201).json({ message: 'Language created', id: result.insertId });
  } catch (error) {
    console.error('Language creation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Language slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create language' });
  }
});

// Update language (admin only)
router.put('/languages/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, native_name, slug, description, flag_icon, region, is_active, display_order } = req.body;

    await query(`
      UPDATE languages SET
        name = COALESCE(?, name),
        native_name = ?,
        slug = COALESCE(?, slug),
        description = ?,
        flag_icon = ?,
        region = ?,
        is_active = COALESCE(?, is_active),
        display_order = COALESCE(?, display_order)
      WHERE id = ?
    `, [name, native_name, slug, description, flag_icon, region, is_active, display_order, req.params.id]);

    res.json({ message: 'Language updated' });
  } catch (error) {
    console.error('Language update error:', error);
    res.status(500).json({ error: 'Failed to update language' });
  }
});

// Delete language (admin only)
router.delete('/languages/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM languages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Language deleted' });
  } catch (error) {
    console.error('Language deletion error:', error);
    res.status(500).json({ error: 'Failed to delete language' });
  }
});

// =============================================
// PRICING PLANS
// =============================================

// Get all pricing plans (public)
router.get('/pricing-plans', async (req, res) => {
  try {
    const { active_only = 'true' } = req.query;

    let sql = 'SELECT * FROM pricing_plans';
    if (active_only === 'true') {
      sql += ' WHERE is_active = TRUE';
    }
    sql += ' ORDER BY display_order ASC, price ASC';

    const plans = await query(sql);
    res.json(plans.map(p => {
      let features = [];
      if (p.features) {
        try {
          features = typeof p.features === 'string' ? JSON.parse(p.features) : p.features;
        } catch (e) {
          features = [];
        }
      }
      return { ...p, features };
    }));
  } catch (error) {
    console.error('Pricing plans fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
});

// Get single pricing plan
router.get('/pricing-plans/:slug', async (req, res) => {
  try {
    const plans = await query('SELECT * FROM pricing_plans WHERE slug = ?', [req.params.slug]);

    if (plans.length === 0) {
      return res.status(404).json({ error: 'Pricing plan not found' });
    }

    const plan = plans[0];
    res.json({
      ...plan,
      features: plan.features ? JSON.parse(plan.features) : []
    });
  } catch (error) {
    console.error('Pricing plan fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch pricing plan' });
  }
});

// Create pricing plan (admin only)
router.post('/pricing-plans', authenticate, adminOnly, [
  body('name').trim().notEmpty(),
  body('slug').trim().notEmpty(),
  body('price').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name, slug, description, price, original_price, billing_period,
      lessons_included, duration_months, features, is_popular, is_active, display_order
    } = req.body;

    const result = await query(`
      INSERT INTO pricing_plans
      (name, slug, description, price, original_price, billing_period, lessons_included, duration_months, features, is_popular, is_active, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, slug, description, price, original_price, billing_period || 'monthly',
      lessons_included, duration_months || 1, features ? JSON.stringify(features) : null,
      is_popular || false, is_active !== false, display_order || 0
    ]);

    res.status(201).json({ message: 'Pricing plan created', id: result.insertId });
  } catch (error) {
    console.error('Pricing plan creation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Plan slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create pricing plan' });
  }
});

// Update pricing plan (admin only)
router.put('/pricing-plans/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const {
      name, slug, description, price, original_price, billing_period,
      lessons_included, duration_months, features, is_popular, is_active, display_order
    } = req.body;

    await query(`
      UPDATE pricing_plans SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = ?,
        price = COALESCE(?, price),
        original_price = ?,
        billing_period = COALESCE(?, billing_period),
        lessons_included = ?,
        duration_months = COALESCE(?, duration_months),
        features = ?,
        is_popular = COALESCE(?, is_popular),
        is_active = COALESCE(?, is_active),
        display_order = COALESCE(?, display_order)
      WHERE id = ?
    `, [
      name, slug, description, price, original_price, billing_period,
      lessons_included, duration_months, features ? JSON.stringify(features) : null,
      is_popular, is_active, display_order, req.params.id
    ]);

    res.json({ message: 'Pricing plan updated' });
  } catch (error) {
    console.error('Pricing plan update error:', error);
    res.status(500).json({ error: 'Failed to update pricing plan' });
  }
});

// Delete pricing plan (admin only)
router.delete('/pricing-plans/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM pricing_plans WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pricing plan deleted' });
  } catch (error) {
    console.error('Pricing plan deletion error:', error);
    res.status(500).json({ error: 'Failed to delete pricing plan' });
  }
});

// =============================================
// FAQs
// =============================================

// Get all FAQs (public)
router.get('/faqs', async (req, res) => {
  try {
    const { category, active_only = 'true' } = req.query;

    let sql = 'SELECT * FROM faqs WHERE 1=1';
    const params = [];

    if (active_only === 'true') {
      sql += ' AND is_active = TRUE';
    }

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY display_order ASC, id ASC';

    const faqs = await query(sql, params);
    res.json(faqs);
  } catch (error) {
    console.error('FAQs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get FAQ categories
router.get('/faqs/categories', async (req, res) => {
  try {
    const categories = await query('SELECT DISTINCT category FROM faqs WHERE is_active = TRUE ORDER BY category');
    res.json(categories.map(c => c.category));
  } catch (error) {
    console.error('FAQ categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ categories' });
  }
});

// Create FAQ (admin only)
router.post('/faqs', authenticate, adminOnly, [
  body('question').trim().notEmpty(),
  body('answer').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, answer, category, display_order, is_active } = req.body;

    const result = await query(`
      INSERT INTO faqs (question, answer, category, display_order, is_active)
      VALUES (?, ?, ?, ?, ?)
    `, [question, answer, category || 'general', display_order || 0, is_active !== false]);

    res.status(201).json({ message: 'FAQ created', id: result.insertId });
  } catch (error) {
    console.error('FAQ creation error:', error);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// Update FAQ (admin only)
router.put('/faqs/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { question, answer, category, display_order, is_active } = req.body;

    await query(`
      UPDATE faqs SET
        question = COALESCE(?, question),
        answer = COALESCE(?, answer),
        category = COALESCE(?, category),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [question, answer, category, display_order, is_active, req.params.id]);

    res.json({ message: 'FAQ updated' });
  } catch (error) {
    console.error('FAQ update error:', error);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// Delete FAQ (admin only)
router.delete('/faqs/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
    res.json({ message: 'FAQ deleted' });
  } catch (error) {
    console.error('FAQ deletion error:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// =============================================
// TESTIMONIALS
// =============================================

// Get all testimonials (public)
router.get('/testimonials', async (req, res) => {
  try {
    const { featured_only, language_id, active_only = 'true', limit } = req.query;

    let sql = `
      SELECT t.*, l.name as language_name, l.slug as language_slug
      FROM testimonials t
      LEFT JOIN languages l ON t.language_id = l.id
      WHERE 1=1
    `;
    const params = [];

    if (active_only === 'true') {
      sql += ' AND t.is_active = TRUE';
    }

    if (featured_only === 'true') {
      sql += ' AND t.is_featured = TRUE';
    }

    if (language_id) {
      sql += ' AND t.language_id = ?';
      params.push(language_id);
    }

    sql += ' ORDER BY t.is_featured DESC, t.created_at DESC';

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const testimonials = await query(sql, params);
    res.json(testimonials);
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Create testimonial (admin only)
router.post('/testimonials', authenticate, adminOnly, [
  body('name').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, role, location, content, rating, avatar_url, language_id, is_featured, is_active } = req.body;

    const result = await query(`
      INSERT INTO testimonials (name, role, location, content, rating, avatar_url, language_id, is_featured, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, role, location, content, rating || 5, avatar_url, language_id, is_featured || false, is_active !== false]);

    res.status(201).json({ message: 'Testimonial created', id: result.insertId });
  } catch (error) {
    console.error('Testimonial creation error:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Update testimonial (admin only)
router.put('/testimonials/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, role, location, content, rating, avatar_url, language_id, is_featured, is_active } = req.body;

    await query(`
      UPDATE testimonials SET
        name = COALESCE(?, name),
        role = ?,
        location = ?,
        content = COALESCE(?, content),
        rating = COALESCE(?, rating),
        avatar_url = ?,
        language_id = ?,
        is_featured = COALESCE(?, is_featured),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [name, role, location, content, rating, avatar_url, language_id, is_featured, is_active, req.params.id]);

    res.json({ message: 'Testimonial updated' });
  } catch (error) {
    console.error('Testimonial update error:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Delete testimonial (admin only)
router.delete('/testimonials/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Testimonial deletion error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// =============================================
// TEAM MEMBERS
// =============================================

// Get all team members (public)
router.get('/team', async (req, res) => {
  try {
    const { active_only = 'true' } = req.query;

    let sql = 'SELECT * FROM team_members';
    if (active_only === 'true') {
      sql += ' WHERE is_active = TRUE';
    }
    sql += ' ORDER BY display_order ASC, name ASC';

    const team = await query(sql);
    res.json(team);
  } catch (error) {
    console.error('Team fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Create team member (admin only)
router.post('/team', authenticate, adminOnly, [
  body('name').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, role, bio, photo_url, linkedin_url, email, display_order, is_active } = req.body;

    const result = await query(`
      INSERT INTO team_members (name, role, bio, photo_url, linkedin_url, email, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, role, bio, photo_url, linkedin_url, email, display_order || 0, is_active !== false]);

    res.status(201).json({ message: 'Team member created', id: result.insertId });
  } catch (error) {
    console.error('Team member creation error:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Update team member (admin only)
router.put('/team/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, role, bio, photo_url, linkedin_url, email, display_order, is_active } = req.body;

    await query(`
      UPDATE team_members SET
        name = COALESCE(?, name),
        role = ?,
        bio = ?,
        photo_url = ?,
        linkedin_url = ?,
        email = ?,
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [name, role, bio, photo_url, linkedin_url, email, display_order, is_active, req.params.id]);

    res.json({ message: 'Team member updated' });
  } catch (error) {
    console.error('Team member update error:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Delete team member (admin only)
router.delete('/team/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    console.error('Team member deletion error:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// =============================================
// CONTENT BLOCKS (CMS)
// =============================================

// Get content blocks for a page (public)
router.get('/blocks/:page', async (req, res) => {
  try {
    const { section, active_only = 'true' } = req.query;

    let sql = 'SELECT * FROM content_blocks WHERE page = ?';
    const params = [req.params.page];

    if (section) {
      sql += ' AND section = ?';
      params.push(section);
    }

    if (active_only === 'true') {
      sql += ' AND is_active = TRUE';
    }

    const blocks = await query(sql, params);
    res.json(blocks.map(b => {
      let metadata = null;
      if (b.metadata) {
        try {
          metadata = typeof b.metadata === 'string' ? JSON.parse(b.metadata) : b.metadata;
        } catch (e) {
          metadata = null;
        }
      }
      return { ...b, metadata };
    }));
  } catch (error) {
    console.error('Content blocks fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch content blocks' });
  }
});

// Get single content block
router.get('/blocks/:page/:section/:blockKey', async (req, res) => {
  try {
    const blocks = await query(
      'SELECT * FROM content_blocks WHERE page = ? AND section = ? AND block_key = ?',
      [req.params.page, req.params.section, req.params.blockKey]
    );

    if (blocks.length === 0) {
      return res.status(404).json({ error: 'Content block not found' });
    }

    const block = blocks[0];
    let metadata = null;
    if (block.metadata) {
      try {
        metadata = typeof block.metadata === 'string' ? JSON.parse(block.metadata) : block.metadata;
      } catch (e) {
        metadata = null;
      }
    }
    res.json({ ...block, metadata });
  } catch (error) {
    console.error('Content block fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch content block' });
  }
});

// Create or update content block (admin only)
router.post('/blocks', authenticate, adminOnly, [
  body('page').trim().notEmpty(),
  body('section').trim().notEmpty(),
  body('block_key').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page, section, block_key, content_type, content, metadata, is_active } = req.body;

    // Upsert - insert or update on duplicate key
    const result = await query(`
      INSERT INTO content_blocks
      (page, section, block_key, content_type, content, metadata, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        content_type = VALUES(content_type),
        content = VALUES(content),
        metadata = VALUES(metadata),
        is_active = VALUES(is_active)
    `, [
      page, section, block_key, content_type || 'text', content,
      metadata ? JSON.stringify(metadata) : null,
      is_active !== false
    ]);

    res.status(201).json({
      message: 'Content block saved',
      id: result.insertId || 'updated'
    });
  } catch (error) {
    console.error('Content block save error:', error);
    res.status(500).json({ error: 'Failed to save content block' });
  }
});

// Delete content block (admin only)
router.delete('/blocks/:page/:section/:blockKey', authenticate, adminOnly, async (req, res) => {
  try {
    await query(
      'DELETE FROM content_blocks WHERE page = ? AND section = ? AND block_key = ?',
      [req.params.page, req.params.section, req.params.blockKey]
    );
    res.json({ message: 'Content block deleted' });
  } catch (error) {
    console.error('Content block deletion error:', error);
    res.status(500).json({ error: 'Failed to delete content block' });
  }
});

// Get all pages with content blocks (admin only)
router.get('/pages', authenticate, adminOnly, async (req, res) => {
  try {
    const pages = await query(`
      SELECT page, COUNT(*) as block_count, MAX(updated_at) as last_updated
      FROM content_blocks
      GROUP BY page
      ORDER BY page
    `);
    res.json(pages);
  } catch (error) {
    console.error('Pages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

module.exports = router;
