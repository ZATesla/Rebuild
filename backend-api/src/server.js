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
const flowRoutes = require('./controllers/flowController');
app.use('/api/flows', flowRoutes);

// Error Handling Middleware
// This should be defined after all other app.use() and routes
// and before the server starts listening.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message: errorMessage,
    // Optionally, you could include the stack trace in development
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 3001; // Default to 3001 if PORT not in .env

const { testConnection } = require('./config/database.config');
const { createFlowDefinitionsTable } = require('./models/FlowDefinition');

async function startServer() {
  try {
    const dbConnected = await testConnection(); // Test DB connection
    if (dbConnected) {
      // If DB connection is successful, try to create tables
      await createFlowDefinitionsTable();
    } else {
      console.warn('Database connection failed. Server will start, but database operations will not work.');
      // Optionally, you could prevent the server from starting if DB is critical:
      // throw new Error("Database connection failed. Server cannot start.");
    }

    app.listen(PORT, () => {
      console.log(`Backend API server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    // process.exit(1); // Exit if server fails to start, e.g. critical DB issue
  }
}

module.exports = { app, startServer };
