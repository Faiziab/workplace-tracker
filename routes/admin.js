const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

let users = [
  { id: 1, phoneNumber: "1234567890", role: "admin" },
  { id: 2, phoneNumber: "1112223333", role: "CGM" },
];

let resorts = [
  { id: 1, name: "Beachside Resort", location: "Miami", clusterGM: 2 },
];

let reports = [
  { id: 1, department: "Housekeeping", status: "pending", resortId: 1 },
];

// ✅ Get Admin Dashboard Data (Admin Only)
router.get("/dashboard", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ users, resorts, reports });
});

// ✅ Assign a Resort to a CGM
router.put("/assign-resort", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const { resortId, cgmId } = req.body;
  const resort = resorts.find(r => r.id === resortId);
  if (!resort) return res.status(404).json({ error: "Resort not found" });

  resort.clusterGM = cgmId;
  res.json({ message: "Resort assigned successfully", resort });
});

module.exports = router;
