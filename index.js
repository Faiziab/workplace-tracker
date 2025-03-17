// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const usersRoute = require('./routes/users');
const resortsRoute = require('./routes/resorts');

// Mount routes
app.use('/api/users', usersRoute);
app.use('/api/resorts', resortsRoute);

// Default endpoint to check server status
app.get('/', (req, res) => {
  res.send('Hotel Management API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
