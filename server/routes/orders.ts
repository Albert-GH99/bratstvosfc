import { RequestHandler } from 'express';
import { query } from '../db';
import { CreateOrderRequest } from '@shared/api';

// Get all orders
export const getOrders: RequestHandler = async (req, res) => {
  try {
    const result = await query(
      `SELECT o.*, json_agg(json_build_object(
        'id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price
      )) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get single order
export const getOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT o.*, json_agg(json_build_object(
        'id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price
      )) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create order
export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, items, payment_method } = req.body as CreateOrderRequest;

    if (!customer_name || !customer_email || !items || items.length === 0) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const productResult = await query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      if (productResult.rows.length === 0) {
        res.status(404).json({ error: `Product ${item.product_id} not found` });
        return;
      }
      totalAmount += productResult.rows[0].price * item.quantity;
    }

    // Create order
    const orderResult = await query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, payment_method)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [customer_name, customer_email, customer_phone || null, totalAmount, payment_method || null]
    );

    const orderId = orderResult.rows[0].id;

    // Create order items
    for (const item of items) {
      const productResult = await query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, productResult.rows[0].price]
      );
    }

    res.status(201).json(orderResult.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update order status
export const updateOrderStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (status) {
      fields.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (payment_status) {
      fields.push(`payment_status = $${paramCount++}`);
      values.push(payment_status);
    }

    if (fields.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const result = await query(
      `UPDATE orders SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};
