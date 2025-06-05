require('dotenv').config(); // Ensure environment variables are loaded

const { Pool } = require('pg'); // Using node-postgres (pg)

let pool;

if (process.env.DATABASE_URL) {
  console.log('Connecting to database using DATABASE_URL.');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add SSL configuration if required for your DATABASE_URL provider (e.g., Heroku)
    // ssl: {
    //   rejectUnauthorized: false, // This might be needed for some environments
    // },
  });
} else {
  console.log('Connecting to database using individual environment variables.');
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'flow_builder_db',
  });
}

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Attempting to connect to the database...');
    const result = await client.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Depending on the error, you might want to check specific error codes
    // For example, if it's a database not found error, credentials error etc.
    if (error.code === '3D000' && process.env.DB_NAME) {
        console.error(`Database "${process.env.DB_NAME}" does not exist. Please ensure it is created.`);
    } else if (error.code === '28P01') {
        console.error(`Authentication failed for user "${process.env.DB_USER}". Check credentials.`);
    }
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
};
