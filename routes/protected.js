const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

// ✅ Ensure this function is correctly defined
router.get("/", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
