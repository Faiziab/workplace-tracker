// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

// Temporary in-memory store for users
let users = [];


// Get All Users
router.get("/", (req, res) => {
  res.json(users);
});

// Create a new user
router.post("/", async (req, res) => {
  const { phoneNumber, password, role } = req.body;
  if (!phoneNumber || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = { id: users.length + 1, phoneNumber, password: hashedPassword, role };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully", user: newUser });
});


// Update User Details
router.put("/:id", async (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { phoneNumber, password, role } = req.body;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (password) user.password = await bcrypt.hash(password, 12);
  if (role) user.role = role;

  res.json({ message: "User updated successfully", user });
});

// Delete User
router.delete("/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
