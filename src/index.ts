import express from 'express';
import cors from 'cors'; // Voeg CORS-import toe
import userRoutes from './routes/userRoutes';

const app = express();

// CORS inschakelen voor alle domeinen
app.use(cors());  // Hiermee worden alle domeinen toegestaan om verzoeken naar je server te sturen


app.use(express.json());  // Voor het verwerken van JSON-body's

// Test API-endpoint
app.get('/', (req, res) => {
  res.send('Budget App API draait!');
});

// Gebruik de userRoutes
app.use('/api/users', userRoutes); // Gebruik /api/users als basisroute voor gebruikersroutes

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
