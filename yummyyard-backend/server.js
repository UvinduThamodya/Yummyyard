// server.js - Main server file
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'yummyyarddb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, phone, address, password } = req.body;

    // Validate required fields
    if (!username || !email || !phone || !address || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if email already exists
      const [emailCheck] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (emailCheck.length > 0) {
        return res.status(409).json({ error: 'Email already in use' });
      }

      // Check if username already exists
      const [usernameCheck] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (usernameCheck.length > 0) {
        return res.status(409).json({ error: 'Username already taken' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert user into database
      const [result] = await connection.execute(
        'INSERT INTO users (username, email, phone, address, password) VALUES (?, ?, ?, ?, ?)',
        [username, email, phone, address, hashedPassword]
      );

      res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if user exists
      const [user] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (user.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const validUser = user[0];

      // Verify password
      const isPasswordMatch = await bcrypt.compare(password, validUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Update last login time
      await connection.execute('UPDATE users SET last_login = NOW() WHERE id = ?', [validUser.id]);

      res.json({
        message: 'Login successful',
        user: {
          id: validUser.id,
          username: validUser.username,
          email: validUser.email
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [menuItems] = await connection.execute('SELECT * FROM menu_items');
      res.json(menuItems);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get menu items by category ID
app.get('/api/menu/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const connection = await pool.getConnection();

    try {
      const [menuItems] = await connection.execute(
        'SELECT * FROM menu_items WHERE category_id = ?',
        [categoryId]
      );
      res.json(menuItems);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`Failed to fetch menu items for category ID ${categoryId}:`, error);
    res.status(500).json({ error: `Failed to fetch menu items for category ID ${categoryId}` });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [categories] = await connection.execute('SELECT DISTINCT category_id, name FROM category_table');
      res.json(categories);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get menu item by ID
app.get('/api/menu/item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();

    try {
      const [menuItems] = await connection.execute(
        'SELECT * FROM menu_items WHERE id = ?',
        [id]
      );
      
      if (menuItems.length === 0) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json(menuItems[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`Failed to fetch menu item with ID ${id}:`, error);
    res.status(500).json({ error: `Failed to fetch menu item` });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { user_id, items, total_amount, delivery_address, contact_number, payment_method } = req.body;

    if (!user_id || !items || !total_amount || !delivery_address || !contact_number || !payment_method) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Insert the order
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total_amount, delivery_address, contact_number, payment_method, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [user_id, total_amount, delivery_address, contact_number, payment_method, 'pending']
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price]
        );
      }

      await connection.commit();

      res.status(201).json({
        message: 'Order created successfully',
        order_id: orderId
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
});

// Get user orders
app.get('/api/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const connection = await pool.getConnection();

    try {
      const [orders] = await connection.execute(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      
      // For each order, get its items
      for (let i = 0; i < orders.length; i++) {
        const [items] = await connection.execute(
          `SELECT oi.*, mi.name, mi.image_url 
           FROM order_items oi 
           JOIN menu_items mi ON oi.item_id = mi.id 
           WHERE oi.order_id = ?`,
          [orders[i].id]
        );
        orders[i].items = items;
      }
      
      res.json(orders);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`Failed to fetch orders for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});