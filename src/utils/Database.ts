import mysql from 'mysql2/promise';

// Maak een verbinding met de MySQL-database
export const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',      
  password: '', 
  database: 'budgetlife', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test de verbinding
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Succesvol verbonden met de MySQL-database');
    connection.release();
  } catch (err) {
    console.error('Fout bij verbinden met de database:', err);
  }
})();
