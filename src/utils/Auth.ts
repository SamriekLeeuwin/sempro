import express from 'express';
import { pool } from '../utils/Database';

const app = express();
app.use(express.json()); // Voor JSON-body parsing

// Test API-endpoint
app.get('/', (req, res) => {
  res.send('Budget App API draait!');
});

// Endpoint om gebruikers op te halen
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen van gebruikers', details: err });
  }
});

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
