// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const { authenticateToken, authorizeRoles } = require("./middleware/auth");


// Import routes
const usersRoute = require('./routes/users');
const resortsRoute = require('./routes/resorts');
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');

// Mount routes
app.use('/api/users', usersRoute);
app.use('/api/resorts', resortsRoute);
app.use('/api', authRoute); // For login
app.use('/api/protected', protectedRoute); // Protected route

app.get('/', (req, res) => {
  res.send('Hotel Management API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
