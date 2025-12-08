const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get all published posts
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = '20', offset = '0' } = req.query;

    // Parse limit and offset as integers upfront
    const limitInt = parseInt(limit, 10) || 20;
    const offsetInt = parseInt(offset, 10) || 0;

    let sql = `
      SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image,
             p.author_name, p.published_at, p.views,
             c.name as category_name, c.slug as category_slug, c.color as category_color
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.is_published = TRUE
    `;
    const params = [];

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (p.title LIKE ? OR p.excerpt LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Use string interpolation for LIMIT/OFFSET to avoid prepared statement issues
    sql += ` ORDER BY p.published_at DESC LIMIT ${limitInt} OFFSET ${offsetInt}`;

    const posts = await query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM blog_posts WHERE is_published = TRUE';
    const countParams = [];

    if (category) {
      countSql += ' AND category_id = (SELECT id FROM blog_categories WHERE slug = ?)';
      countParams.push(category);
    }

    const countResult = await query(countSql, countParams);

    res.json({
      posts,
      total: countResult[0].total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(countResult[0].total / limit)
    });
  } catch (error) {
    console.error('Posts fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const posts = await query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.is_published = TRUE
    `, [req.params.slug]);

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    await query('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [posts[0].id]);

    // Get related posts
    const related = await query(`
      SELECT id, title, slug, excerpt, featured_image, published_at
      FROM blog_posts
      WHERE category_id = ? AND id != ? AND is_published = TRUE
      ORDER BY published_at DESC
      LIMIT 3
    `, [posts[0].category_id, posts[0].id]);

    const post = posts[0];
    res.json({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      relatedPosts: related
    });
  } catch (error) {
    console.error('Post fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await query(`
      SELECT c.*, COUNT(p.id) as post_count
      FROM blog_categories c
      LEFT JOIN blog_posts p ON p.category_id = c.id AND p.is_published = TRUE
      GROUP BY c.id
      ORDER BY c.name
    `);

    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get featured/recent posts for homepage
router.get('/featured', async (req, res) => {
  try {
    const { limit = '3' } = req.query;
    const limitInt = parseInt(limit, 10) || 3;

    const posts = await query(`
      SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image,
             p.author_name, p.published_at,
             c.name as category_name, c.slug as category_slug, c.color as category_color
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.is_published = TRUE
      ORDER BY p.views DESC, p.published_at DESC
      LIMIT ${limitInt}
    `);

    res.json(posts);
  } catch (error) {
    console.error('Featured posts fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch featured posts' });
  }
});

// ============ ADMIN ROUTES ============

// Get all posts (including drafts)
router.get('/admin/all', authenticate, adminOnly, async (req, res) => {
  try {
    const posts = await query(`
      SELECT p.*, c.name as category_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    res.json(posts.map(p => ({
      ...p,
      tags: p.tags ? JSON.parse(p.tags) : []
    })));
  } catch (error) {
    console.error('Admin posts fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by ID (admin)
router.get('/admin/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const posts = await query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = posts[0];
    res.json({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    });
  } catch (error) {
    console.error('Post fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post
router.post('/', authenticate, adminOnly, [
  body('title').trim().notEmpty(),
  body('slug').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title, slug, excerpt, content, featuredImage,
      categoryId, authorName, authorBio, isPublished,
      metaTitle, metaDescription, tags
    } = req.body;

    const result = await query(`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, featured_image,
        category_id, author_id, author_name, author_bio,
        is_published, published_at, meta_title, meta_description, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, slug, excerpt, content, featuredImage,
      categoryId || null, req.user.id, authorName || req.user.first_name,
      authorBio, isPublished, isPublished ? new Date() : null,
      metaTitle, metaDescription, tags ? JSON.stringify(tags) : null
    ]);

    res.status(201).json({
      message: 'Post created',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Post creation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const {
      title, slug, excerpt, content, featuredImage,
      categoryId, authorName, authorBio, isPublished,
      metaTitle, metaDescription, tags
    } = req.body;

    // Check if changing to published
    const current = await query('SELECT is_published FROM blog_posts WHERE id = ?', [req.params.id]);
    const wasPublished = current[0]?.is_published;
    const publishedAt = !wasPublished && isPublished ? new Date() : undefined;

    await query(`
      UPDATE blog_posts SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        excerpt = ?,
        content = ?,
        featured_image = ?,
        category_id = ?,
        author_name = COALESCE(?, author_name),
        author_bio = ?,
        is_published = COALESCE(?, is_published),
        published_at = COALESCE(?, published_at),
        meta_title = ?,
        meta_description = ?,
        tags = ?
      WHERE id = ?
    `, [
      title, slug, excerpt, content, featuredImage,
      categoryId, authorName, authorBio, isPublished,
      publishedAt, metaTitle, metaDescription,
      tags ? JSON.stringify(tags) : null, req.params.id
    ]);

    res.json({ message: 'Post updated' });
  } catch (error) {
    console.error('Post update error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Post deletion error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Direct insert for seeding (no auth required - for initial setup only)
router.post('/direct-insert', async (req, res) => {
  try {
    const {
      title, slug, excerpt, content, featured_image,
      category_id, author_name, is_published
    } = req.body;

    // Check if slug already exists
    const existing = await query('SELECT id FROM blog_posts WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(200).json({ message: 'Post already exists', postId: existing[0].id });
    }

    const result = await query(`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, featured_image,
        category_id, author_name, is_published, published_at, views
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)
    `, [
      title, slug, excerpt, content, featured_image,
      category_id || 1, author_name || 'iSPEAK Team', is_published ? 1 : 0
    ]);

    res.status(201).json({
      message: 'Post created',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Direct insert error:', error);
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

// Create category
router.post('/categories', authenticate, adminOnly, [
  body('name').trim().notEmpty(),
  body('slug').trim().notEmpty()
], async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;

    const result = await query(
      'INSERT INTO blog_categories (name, slug, description, color) VALUES (?, ?, ?, ?)',
      [name, slug, description, color || '#0d9488']
    );

    res.status(201).json({
      message: 'Category created',
      categoryId: result.insertId
    });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

module.exports = router;
