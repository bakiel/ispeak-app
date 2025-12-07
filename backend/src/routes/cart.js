const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get or create cart
async function getOrCreateCart(userId, sessionId) {
  let carts;

  if (userId) {
    carts = await query('SELECT * FROM carts WHERE user_id = ?', [userId]);
  } else if (sessionId) {
    carts = await query('SELECT * FROM carts WHERE session_id = ?', [sessionId]);
  }

  if (carts && carts.length > 0) {
    return carts[0];
  }

  // Create new cart
  const newSessionId = sessionId || uuidv4();
  const result = await query(
    'INSERT INTO carts (user_id, session_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))',
    [userId || null, newSessionId]
  );

  return {
    id: result.insertId,
    user_id: userId,
    session_id: newSessionId
  };
}

// Get cart
router.get('/', optionalAuth, async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const cart = await getOrCreateCart(req.user?.id, sessionId);

    const items = await query(`
      SELECT ci.*, p.name, p.slug, p.price, p.sale_price, p.featured_image, p.stock_quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `, [cart.id]);

    const formattedItems = items.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      slug: item.slug,
      quantity: item.quantity,
      price: item.sale_price || item.price,
      priceAtAdd: item.price_at_add,
      image: item.featured_image,
      inStock: item.stock_quantity >= item.quantity
    }));

    const subtotal = formattedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      id: cart.id,
      sessionId: cart.session_id,
      items: formattedItems,
      itemCount: formattedItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal
    });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/items', optionalAuth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = req.headers['x-session-id'];

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    // Check product exists and has stock
    const products = await query(
      'SELECT id, price, sale_price, stock_quantity, track_inventory FROM products WHERE id = ? AND status = "active"',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];

    if (product.track_inventory && product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock', available: product.stock_quantity });
    }

    const cart = await getOrCreateCart(req.user?.id, sessionId);
    const price = product.sale_price || product.price;

    // Check if item already in cart
    const existingItems = await query(
      'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cart.id, productId]
    );

    if (existingItems.length > 0) {
      const newQuantity = existingItems[0].quantity + quantity;

      if (product.track_inventory && product.stock_quantity < newQuantity) {
        return res.status(400).json({ error: 'Insufficient stock for requested quantity' });
      }

      await query(
        'UPDATE cart_items SET quantity = ? WHERE id = ?',
        [newQuantity, existingItems[0].id]
      );
    } else {
      await query(
        'INSERT INTO cart_items (cart_id, product_id, quantity, price_at_add) VALUES (?, ?, ?, ?)',
        [cart.id, productId, quantity, price]
      );
    }

    res.json({ message: 'Item added to cart', sessionId: cart.session_id });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/items/:itemId', optionalAuth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;
    const sessionId = req.headers['x-session-id'];

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = await getOrCreateCart(req.user?.id, sessionId);

    // Verify item belongs to this cart
    const items = await query(`
      SELECT ci.*, p.stock_quantity, p.track_inventory
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ? AND ci.cart_id = ?
    `, [itemId, cart.id]);

    if (items.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const item = items[0];

    if (item.track_inventory && item.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock', available: item.stock_quantity });
    }

    await query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);

    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove item from cart
router.delete('/items/:itemId', optionalAuth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const sessionId = req.headers['x-session-id'];

    const cart = await getOrCreateCart(req.user?.id, sessionId);

    await query('DELETE FROM cart_items WHERE id = ? AND cart_id = ?', [itemId, cart.id]);

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.delete('/', optionalAuth, async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const cart = await getOrCreateCart(req.user?.id, sessionId);

    await query('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Merge guest cart to user cart (after login)
router.post('/merge', async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
      return res.status(400).json({ error: 'Session ID and user ID required' });
    }

    // Get guest cart
    const guestCarts = await query('SELECT id FROM carts WHERE session_id = ? AND user_id IS NULL', [sessionId]);

    if (guestCarts.length === 0) {
      return res.json({ message: 'No guest cart to merge' });
    }

    const guestCart = guestCarts[0];

    // Get or create user cart
    let userCarts = await query('SELECT id FROM carts WHERE user_id = ?', [userId]);

    if (userCarts.length === 0) {
      // Transfer guest cart to user
      await query('UPDATE carts SET user_id = ? WHERE id = ?', [userId, guestCart.id]);
      return res.json({ message: 'Cart transferred to user' });
    }

    const userCart = userCarts[0];

    // Merge items from guest cart to user cart
    const guestItems = await query('SELECT product_id, quantity, price_at_add FROM cart_items WHERE cart_id = ?', [guestCart.id]);

    for (const item of guestItems) {
      const existingItems = await query(
        'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [userCart.id, item.product_id]
      );

      if (existingItems.length > 0) {
        await query(
          'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
          [item.quantity, existingItems[0].id]
        );
      } else {
        await query(
          'INSERT INTO cart_items (cart_id, product_id, quantity, price_at_add) VALUES (?, ?, ?, ?)',
          [userCart.id, item.product_id, item.quantity, item.price_at_add]
        );
      }
    }

    // Delete guest cart
    await query('DELETE FROM carts WHERE id = ?', [guestCart.id]);

    res.json({ message: 'Carts merged successfully' });
  } catch (error) {
    console.error('Cart merge error:', error);
    res.status(500).json({ error: 'Failed to merge carts' });
  }
});

module.exports = router;
