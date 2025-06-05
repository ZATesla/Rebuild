const { pool } = require('../config/database.config');

// Represents the structure of a FlowDefinition
// This is a conceptual model. In a full ORM, this would be more detailed.
class FlowDefinition {
  constructor(id, name, description, diagram, created_at, updated_at) {
    this.id = id; // Typically a UUID or auto-incrementing integer
    this.name = name; // Name of the flow
    this.description = description; // Optional description
    this.diagram = diagram; // JSON or XML representing the flow structure (e.g., from a UI editor)
    this.created_at = created_at; // Timestamp of creation
    this.updated_at = updated_at; // Timestamp of last update
  }
}

// Placeholder function to create the flow_definitions table if it doesn't exist
// In a real application, this would be part of a migration system.
const createFlowDefinitionsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS flow_definitions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      diagram JSONB NOT NULL, -- Using JSONB for flexibility with diagram data
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    const client = await pool.connect();
    // Check if pg_crypto extension is enabled, needed for gen_random_uuid()
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    await client.query(createTableQuery);
    console.log('FlowDefinitions table checked/created successfully.');
    client.release();
  } catch (error) {
    console.error('Error creating flow_definitions table:', error);
    // If the error is because the database doesn't exist, testConnection would have caught it.
    // This might catch other errors like permission issues for CREATE TABLE.
  }
};

module.exports = {
  FlowDefinition,
  createFlowDefinitionsTable,
};
