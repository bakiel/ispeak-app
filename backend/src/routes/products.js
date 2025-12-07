const express = require('express');
const { query } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, status, featured, search, sort, limit = 50, offset = 0 } = req.query;

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    // Filter by status (default to active for public)
    if (status) {
      sql += ' AND p.status = ?';
      params.push(status);
    } else {
      sql += ' AND p.status = "active"';
    }

    // Filter by category
    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    // Filter featured
    if (featured === 'true') {
      sql += ' AND p.featured = TRUE';
    }

    // Search
    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        sql += ' ORDER BY p.price ASC';
        break;
      case 'price_desc':
        sql += ' ORDER BY p.price DESC';
        break;
      case 'newest':
        sql += ' ORDER BY p.created_at DESC';
        break;
      case 'name':
        sql += ' ORDER BY p.name ASC';
        break;
      default:
        sql += ' ORDER BY p.featured DESC, p.created_at DESC';
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const products = await query(sql, params);

    // Parse JSON fields
    const formattedProducts = products.map(p => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
      tags: p.tags ? JSON.parse(p.tags) : [],
      dimensions: p.dimensions ? JSON.parse(p.dimensions) : null
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const products = await query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.status = 'active'
    `, [req.params.slug]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];

    // Get reviews
    const reviews = await query(`
      SELECT r.*, u.first_name, u.last_name
      FROM product_reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ? AND r.status = 'approved'
      ORDER BY r.created_at DESC
      LIMIT 10
    `, [product.id]);

    // Get related products
    const related = await query(`
      SELECT id, name, slug, price, sale_price, featured_image
      FROM products
      WHERE category_id = ? AND id != ? AND status = 'active'
      ORDER BY RAND()
      LIMIT 4
    `, [product.category_id, product.id]);

    res.json({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      tags: product.tags ? JSON.parse(product.tags) : [],
      dimensions: product.dimensions ? JSON.parse(product.dimensions) : null,
      reviews,
      relatedProducts: related
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const products = await query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [req.params.id]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];
    res.json({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      tags: product.tags ? JSON.parse(product.tags) : [],
      dimensions: product.dimensions ? JSON.parse(product.dimensions) : null
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get product categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM product_categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.status = 'active'
      GROUP BY c.id
      ORDER BY c.display_order, c.name
    `);

    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Check stock availability
router.post('/check-stock', async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    const results = [];
    for (const item of items) {
      const products = await query(
        'SELECT id, name, stock_quantity, track_inventory FROM products WHERE id = ?',
        [item.productId]
      );

      if (products.length === 0) {
        results.push({ productId: item.productId, available: false, reason: 'Product not found' });
      } else {
        const product = products[0];
        if (!product.track_inventory) {
          results.push({ productId: item.productId, available: true, quantity: item.quantity });
        } else if (product.stock_quantity >= item.quantity) {
          results.push({ productId: item.productId, available: true, quantity: item.quantity });
        } else {
          results.push({
            productId: item.productId,
            available: false,
            reason: 'Insufficient stock',
            availableQuantity: product.stock_quantity
          });
        }
      }
    }

    const allAvailable = results.every(r => r.available);
    res.json({ allAvailable, items: results });
  } catch (error) {
    console.error('Stock check error:', error);
    res.status(500).json({ error: 'Failed to check stock' });
  }
});

module.exports = router;
