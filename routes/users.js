// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// Temporary in-memory store for users
let users = [{ id: 1, phoneNumber: "1234567890",password: "$2b$12$/eoPx6...", role: "admin" }];


// Get All Users
router.get("/", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json(users);
});

// Create a new user
router.post("/", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { phoneNumber, password, role } = req.body;
  if (!phoneNumber || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 12);
  users.push({ id: users.length + 1, phoneNumber, password : hashedPassword, role });
  res.status(201).json({ message: "User created successfully", user: newUser });
});


// ✅ Get user by ID
router.get("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});


// Update User Details
router.put("/:id", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { phoneNumber, password, role } = req.body;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (password) user.password = await bcrypt.hash(password, 12);
  if (role) user.role = role;

  res.json({ message: "User updated successfully", user });
});

// Delete user (Admin Only)
router.delete("/:id", authenticateToken, authorizeRoles("admin"), (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
