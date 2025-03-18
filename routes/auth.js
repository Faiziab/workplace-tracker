// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET ; // Store this in .env for production

// For demonstration, we'll use the in-memory users array from users.js
let users = [
  {
    id: 1,
    phoneNumber: '1234567890',
    // Password is stored hashed for security. In production, create users with hashed passwords.
    // For demo, let's hash 'password123'
    password: '$2b$12$/eoPx6jBA60BvbMSC3QHDezZBCakSU5.ditlq2NIO/PolD2AjO.dW', // bcrypt hash for "password123"
    role: 'admin'
  }
];

router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(400).json({ error: 'Phone number and password are required' });
  }

  // Find user by phone number
  const user = users.find(u => u.phoneNumber === phoneNumber);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Logged in successfully', token });
});

module.exports = router;
