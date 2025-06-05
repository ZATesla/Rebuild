// Main server setup for Backend API
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Flow Builder Backend API!' });
});

// TODO: Add other routes for flow definitions, execution, etc.
// For example:
// const flowRoutes = require('./controllers/flowController');
// app.use('/api/flows', flowRoutes);

const PORT = process.env.PORT || 3001; // Default to 3001 if PORT not in .env

function startServer() {
  app.listen(PORT, () => {
    console.log(`Backend API server is running on port ${PORT}`);
  });
}

module.exports = { app, startServer };
