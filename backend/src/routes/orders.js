const express = require('express');
const { body, validationResult } = require('express-validator');
const { query, transaction } = require('../config/database');
const { authenticate, optionalAuth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', optionalAuth, [
  body('customerEmail').isEmail(),
  body('customerFirstName').trim().notEmpty(),
  body('customerLastName').trim().notEmpty(),
  body('shippingAddress').isObject(),
  body('items').isArray({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      customerEmail,
      customerFirstName,
      customerLastName,
      customerPhone,
      shippingAddress,
      billingAddress,
      items,
      couponCode,
      paymentIntentId
    } = req.body;

    // Generate order number
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const countResult = await query(
      'SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE()'
    );
    const orderNumber = `ISP-${datePrefix}-${String(countResult[0].count + 1).padStart(4, '0')}`;

    // Calculate totals
    let subtotal = 0;
    const enrichedItems = [];

    for (const item of items) {
      const products = await query('SELECT id, name, price, sale_price, stock_quantity FROM products WHERE id = ?', [item.productId]);
      if (products.length === 0) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      const product = products[0];
      const itemPrice = product.sale_price || product.price;
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      enrichedItems.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        price: itemPrice,
        total: itemTotal
      });
    }

    // Apply coupon if provided
    let discountAmount = 0;
    if (couponCode) {
      const coupons = await query(`
        SELECT * FROM coupons
        WHERE code = ? AND is_active = TRUE
        AND valid_from <= NOW() AND valid_until >= NOW()
        AND (usage_limit IS NULL OR used_count < usage_limit)
      `, [couponCode]);

      if (coupons.length > 0) {
        const coupon = coupons[0];
        if (subtotal >= coupon.minimum_order) {
          if (coupon.discount_type === 'percentage') {
            discountAmount = subtotal * (coupon.discount_value / 100);
            if (coupon.maximum_discount) {
              discountAmount = Math.min(discountAmount, coupon.maximum_discount);
            }
          } else {
            discountAmount = coupon.discount_value;
          }
        }
      }
    }

    const shippingCost = subtotal >= 50 ? 0 : 5.99; // Free shipping over $50
    const taxAmount = (subtotal - discountAmount) * 0.08; // 8% tax
    const totalAmount = subtotal + shippingCost + taxAmount - discountAmount;

    // Create order
    const result = await query(`
      INSERT INTO orders (
        order_number, user_id, customer_email, customer_first_name, customer_last_name,
        customer_phone, shipping_address, billing_address, items, subtotal,
        shipping_cost, tax_amount, discount_amount, total_amount, coupon_code,
        payment_intent_id, status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
    `, [
      orderNumber,
      req.user?.id || null,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerPhone || null,
      JSON.stringify(shippingAddress),
      JSON.stringify(billingAddress || shippingAddress),
      JSON.stringify(enrichedItems),
      subtotal,
      shippingCost,
      taxAmount,
      discountAmount,
      totalAmount,
      couponCode || null,
      paymentIntentId || null
    ]);

    // Update stock
    for (const item of enrichedItems) {
      await query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND track_inventory = TRUE',
        [item.quantity, item.product_id]
      );
    }

    // Record coupon usage if applicable
    if (couponCode && discountAmount > 0) {
      const coupons = await query('SELECT id FROM coupons WHERE code = ?', [couponCode]);
      if (coupons.length > 0) {
        await query(
          'INSERT INTO coupon_usage (coupon_id, user_id, order_id, discount_applied) VALUES (?, ?, ?, ?)',
          [coupons[0].id, req.user?.id || null, result.insertId, discountAmount]
        );
      }
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: result.insertId,
        orderNumber,
        subtotal,
        shippingCost,
        taxAmount,
        discountAmount,
        totalAmount,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by order number (public with email verification)
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email required for order tracking' });
    }

    const orders = await query(`
      SELECT id, order_number, customer_first_name, customer_last_name,
             items, subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
             status, payment_status, tracking_number, created_at, shipped_at, delivered_at
      FROM orders
      WHERE order_number = ? AND customer_email = ?
    `, [req.params.orderNumber, email]);

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];
    const statusHistory = await query(
      'SELECT status, notes, created_at FROM order_status_history WHERE order_id = ? ORDER BY created_at DESC',
      [order.id]
    );

    res.json({
      ...order,
      items: JSON.parse(order.items),
      statusHistory
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({ error: 'Failed to track order' });
  }
});

// Get user's orders
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await query(`
      SELECT id, order_number, items, total_amount, status, payment_status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [req.user.id]);

    const formattedOrders = orders.map(o => ({
      ...o,
      items: JSON.parse(o.items)
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get specific order (authenticated user or admin)
router.get('/:id', authenticate, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    } else {
      orders = await query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    }

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];
    res.json({
      ...order,
      items: JSON.parse(order.items),
      shipping_address: JSON.parse(order.shipping_address),
      billing_address: order.billing_address ? JSON.parse(order.billing_address) : null
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticate, adminOnly, [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
], async (req, res) => {
  try {
    const { status, notes, trackingNumber } = req.body;

    const updates = { status };
    if (status === 'shipped') {
      updates.shipped_at = new Date();
      if (trackingNumber) {
        updates.tracking_number = trackingNumber;
      }
    } else if (status === 'delivered') {
      updates.delivered_at = new Date();
    }

    await query(`
      UPDATE orders SET status = ?, tracking_number = COALESCE(?, tracking_number),
      shipped_at = COALESCE(?, shipped_at), delivered_at = COALESCE(?, delivered_at)
      WHERE id = ?
    `, [status, trackingNumber, updates.shipped_at, updates.delivered_at, req.params.id]);

    res.json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Order update error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Update payment status
router.put('/:id/payment', authenticate, adminOnly, [
  body('paymentStatus').isIn(['pending', 'paid', 'failed', 'refunded'])
], async (req, res) => {
  try {
    const { paymentStatus, paymentIntentId } = req.body;

    await query(
      'UPDATE orders SET payment_status = ?, payment_intent_id = COALESCE(?, payment_intent_id) WHERE id = ?',
      [paymentStatus, paymentIntentId, req.params.id]
    );

    res.json({ message: 'Payment status updated' });
  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

module.exports = router;
