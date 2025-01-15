import express from 'express';
import { pool } from './utils/Database'; // Dit is de import voor je databaseverbinding

const app = express();
app.use(express.json());  // Voor het verwerken van JSON-body's

// Test API-endpoint
app.get('/', (req, res) => {
  res.send('Budget App API draait!');
});

// Endpoint om gebruikers op te halen
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);  // Stuur de gebruikers als JSON terug
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen van gebruikers', details: err });
  }
});

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
