// routes/protected.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, (req, res) => {
  // If token is valid, req.user will be populated
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});

module.exports = router;
