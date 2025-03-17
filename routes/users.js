// routes/users.js
const express = require('express');
const router = express.Router();

// Temporary in-memory store for users
let users = [];

// Create a new user
router.post('/', (req, res) => {
  const { phoneNumber, password, role } = req.body;
  if (!phoneNumber || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newUser = { id: users.length + 1, phoneNumber, password, role };
  users.push(newUser);
  res.status(201).json({ message: 'User created', user: newUser });
});

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update a user
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { phoneNumber, password, role } = req.body;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (password) user.password = password;
  if (role) user.role = role;

  res.json({ message: 'User updated', user });
});

// Delete a user
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
});

module.exports = router;
