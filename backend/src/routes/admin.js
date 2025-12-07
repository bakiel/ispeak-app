const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes require admin authentication
router.use(authenticate, adminOnly);

// ============ DASHBOARD ============

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    // Users stats
    const userStats = await query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN role = 'customer' THEN 1 ELSE 0 END) as customers,
        SUM(CASE WHEN role = 'educator' THEN 1 ELSE 0 END) as educators,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) as new_this_week
      FROM users
    `);

    // Order stats
    const orderStats = await query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) as this_month,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN total_amount ELSE 0 END) as revenue_this_month
      FROM orders
      WHERE payment_status = 'paid'
    `);

    // Lesson stats
    const lessonStats = await query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'scheduled' AND scheduled_at >= NOW() THEN 1 ELSE 0 END) as upcoming,
        SUM(CASE WHEN status = 'completed' AND completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) as completed_this_week
      FROM lessons
    `);

    // Donation stats
    const donationStats = await query(`
      SELECT
        COUNT(*) as total,
        SUM(amount) as total_amount,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN amount ELSE 0 END) as this_month
      FROM donations
      WHERE payment_status = 'completed'
    `);

    // Recent activity
    const recentOrders = await query(`
      SELECT id, order_number, customer_first_name, customer_last_name, total_amount, status, created_at
      FROM orders ORDER BY created_at DESC LIMIT 5
    `);

    const recentTrials = await query(`
      SELECT id, parent_name, email, preferred_language, status, created_at
      FROM free_trial_requests ORDER BY created_at DESC LIMIT 5
    `);

    res.json({
      users: userStats[0],
      orders: orderStats[0],
      lessons: lessonStats[0],
      donations: donationStats[0],
      recentOrders,
      recentTrials
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// ============ PRODUCTS ============

// Get all products (with more details)
router.get('/products', async (req, res) => {
  try {
    const { status, category, search, limit = 50, offset = 0 } = req.query;

    let sql = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      sql += ' AND p.status = ?';
      params.push(status);
    }

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const products = await query(sql, params);

    res.json(products.map(p => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
      tags: p.tags ? JSON.parse(p.tags) : []
    })));
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create product
router.post('/products', [
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
      name, slug, description, shortDescription, price, salePrice, costPrice,
      sku, categoryId, images, featuredImage, stockQuantity, lowStockThreshold,
      trackInventory, weight, dimensions, status, featured, tags, metaTitle, metaDescription
    } = req.body;

    const result = await query(`
      INSERT INTO products (
        name, slug, description, short_description, price, sale_price, cost_price,
        sku, category_id, images, featured_image, stock_quantity, low_stock_threshold,
        track_inventory, weight, dimensions, status, featured, tags, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, slug, description, shortDescription, price, salePrice, costPrice,
      sku, categoryId, images ? JSON.stringify(images) : null, featuredImage,
      stockQuantity || 0, lowStockThreshold || 10, trackInventory !== false,
      weight, dimensions ? JSON.stringify(dimensions) : null, status || 'draft',
      featured || false, tags ? JSON.stringify(tags) : null, metaTitle, metaDescription
    ]);

    res.status(201).json({
      message: 'Product created',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Product creation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Slug or SKU already exists' });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const {
      name, slug, description, shortDescription, price, salePrice, costPrice,
      sku, categoryId, images, featuredImage, stockQuantity, lowStockThreshold,
      trackInventory, weight, dimensions, status, featured, tags, metaTitle, metaDescription
    } = req.body;

    await query(`
      UPDATE products SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = ?,
        short_description = ?,
        price = COALESCE(?, price),
        sale_price = ?,
        cost_price = ?,
        sku = ?,
        category_id = ?,
        images = ?,
        featured_image = ?,
        stock_quantity = COALESCE(?, stock_quantity),
        low_stock_threshold = COALESCE(?, low_stock_threshold),
        track_inventory = COALESCE(?, track_inventory),
        weight = ?,
        dimensions = ?,
        status = COALESCE(?, status),
        featured = COALESCE(?, featured),
        tags = ?,
        meta_title = ?,
        meta_description = ?
      WHERE id = ?
    `, [
      name, slug, description, shortDescription, price, salePrice, costPrice,
      sku, categoryId, images ? JSON.stringify(images) : null, featuredImage,
      stockQuantity, lowStockThreshold, trackInventory, weight,
      dimensions ? JSON.stringify(dimensions) : null, status, featured,
      tags ? JSON.stringify(tags) : null, metaTitle, metaDescription, req.params.id
    ]);

    res.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    await query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Bulk update product status
router.post('/products/bulk-status', async (req, res) => {
  try {
    const { productIds, status } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Product IDs required' });
    }

    const placeholders = productIds.map(() => '?').join(',');
    await query(
      `UPDATE products SET status = ? WHERE id IN (${placeholders})`,
      [status, ...productIds]
    );

    res.json({ message: `${productIds.length} products updated` });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ error: 'Failed to update products' });
  }
});

// ============ ORDERS ============

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const { status, paymentStatus, startDate, endDate, limit = 50, offset = 0 } = req.query;

    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (paymentStatus) {
      sql += ' AND payment_status = ?';
      params.push(paymentStatus);
    }

    if (startDate) {
      sql += ' AND created_at >= ?';
      params.push(startDate);
    }

    if (endDate) {
      sql += ' AND created_at <= ?';
      params.push(endDate);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const orders = await query(sql, params);

    res.json(orders.map(o => ({
      ...o,
      items: JSON.parse(o.items),
      shipping_address: JSON.parse(o.shipping_address),
      billing_address: o.billing_address ? JSON.parse(o.billing_address) : null
    })));
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ============ EDUCATORS ============

// Get all educator applications
router.get('/educators', async (req, res) => {
  try {
    const { status } = req.query;

    let sql = `
      SELECT e.*, u.email, u.first_name, u.last_name, u.phone
      FROM educators e
      JOIN users u ON e.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      sql += ' AND e.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY e.created_at DESC';

    const educators = await query(sql, params);

    res.json(educators.map(e => ({
      ...e,
      languages: JSON.parse(e.languages),
      availability: e.availability ? JSON.parse(e.availability) : null
    })));
  } catch (error) {
    console.error('Educators fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch educators' });
  }
});

// Update educator status
router.put('/educators/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updates = { status };
    if (status === 'approved') {
      updates.approved_at = new Date();
    }

    await query(
      'UPDATE educators SET status = ?, approved_at = ? WHERE id = ?',
      [status, updates.approved_at, req.params.id]
    );

    // Update user role if approved
    if (status === 'approved') {
      await query(
        'UPDATE users SET role = "educator" WHERE id = (SELECT user_id FROM educators WHERE id = ?)',
        [req.params.id]
      );
    }

    res.json({ message: 'Educator status updated' });
  } catch (error) {
    console.error('Educator update error:', error);
    res.status(500).json({ error: 'Failed to update educator' });
  }
});

// ============ COUPONS ============

// Get all coupons
router.get('/coupons', async (req, res) => {
  try {
    const coupons = await query('SELECT * FROM coupons ORDER BY created_at DESC');
    res.json(coupons.map(c => ({
      ...c,
      applicable_products: c.applicable_products ? JSON.parse(c.applicable_products) : null,
      applicable_categories: c.applicable_categories ? JSON.parse(c.applicable_categories) : null
    })));
  } catch (error) {
    console.error('Coupons fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// Create coupon
router.post('/coupons', [
  body('code').trim().notEmpty(),
  body('discountType').isIn(['percentage', 'fixed']),
  body('discountValue').isFloat({ min: 0 }),
  body('validFrom').isISO8601(),
  body('validUntil').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      code, description, discountType, discountValue, minimumOrder,
      maximumDiscount, usageLimit, perUserLimit, validFrom, validUntil,
      applicableProducts, applicableCategories
    } = req.body;

    const result = await query(`
      INSERT INTO coupons (
        code, description, discount_type, discount_value, minimum_order,
        maximum_discount, usage_limit, per_user_limit, valid_from, valid_until,
        applicable_products, applicable_categories
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      code.toUpperCase(), description, discountType, discountValue, minimumOrder || 0,
      maximumDiscount, usageLimit, perUserLimit || 1, validFrom, validUntil,
      applicableProducts ? JSON.stringify(applicableProducts) : null,
      applicableCategories ? JSON.stringify(applicableCategories) : null
    ]);

    res.status(201).json({
      message: 'Coupon created',
      couponId: result.insertId
    });
  } catch (error) {
    console.error('Coupon creation error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Coupon code already exists' });
    }
    res.status(500).json({ error: 'Failed to create coupon' });
  }
});

// Toggle coupon active status
router.put('/coupons/:id/toggle', async (req, res) => {
  try {
    await query('UPDATE coupons SET is_active = NOT is_active WHERE id = ?', [req.params.id]);
    res.json({ message: 'Coupon status toggled' });
  } catch (error) {
    console.error('Coupon toggle error:', error);
    res.status(500).json({ error: 'Failed to toggle coupon' });
  }
});

// Delete coupon
router.delete('/coupons/:id', async (req, res) => {
  try {
    await query('DELETE FROM coupons WHERE id = ?', [req.params.id]);
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    console.error('Coupon deletion error:', error);
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
});

module.exports = router;
