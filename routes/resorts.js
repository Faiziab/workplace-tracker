// routes/resorts.js
const express = require('express');
const router = express.Router();

// Temporary in-memory store for resorts
let resorts = [{ id: 1, name: "Beachside Resort", location: "Miami", clusterGM: "John Doe" }];

// Create a new resort
router.post('/', (req, res) => {
  const { name, location, clusterGM } = req.body;
  if (!name || !location || !clusterGM) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newResort = { id: resorts.length + 1, name, location, clusterGM };
  resorts.push(newResort);
  res.status(201).json({ message: 'Resort created', resort: newResort });
});

// Get all resorts
router.get('/', (req, res) => {
  res.json(resorts);
});

// Get resort by ID
router.get('/:id', (req, res) => {
  const resort = resorts.find(r => r.id === parseInt(req.params.id));
  if (!resort) return res.status(404).json({ error: 'Resort not found' });
  res.json(resort);
});

// Update a resort
router.put("/:id", (req, res) => {
  const resort = resorts.find(r => r.id === parseInt(req.params.id));
  if (!resort) return res.status(404).json({ error: "Resort not found" });

  const { name, location, clusterGM } = req.body;
  if (name) resort.name = name;
  if (location) resort.location = location;
  if (clusterGM) resort.clusterGM = clusterGM;

  res.json({ message: "Resort updated successfully", resort });
});

// Delete a resort
router.delete('/:id', (req, res) => {
  resorts = resorts.filter(r => r.id !== parseInt(req.params.id));
  res.json({ message: 'Resort deleted' });
});

module.exports = router;
