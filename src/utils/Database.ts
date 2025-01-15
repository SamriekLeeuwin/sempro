import promise from 'mysql2/promise';
import dotenv from 'dotenv';

// Laad .env variabelen
dotenv.config();

// Maak een verbinding met de MySQL database
export const pool = promise.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',      // De juiste gebruiker (root)
  password: process.env.DB_PASSWORD || '',  // Leeg omdat je geen wachtwoord hebt
  database: process.env.DB_NAME || 'budgetlife',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
