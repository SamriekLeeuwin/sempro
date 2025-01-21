import express from 'express';
import cors from 'cors'; // Voeg CORS-import toe
import userRoutes from './routes/userRoutes';
import budgetRoutes from '../src/routes/budgetRoutes'; // Importeer de budget routes
import categoryRoutes from '../src/routes/categoryRoutes'; // Importeer de category routes
import transactionRoutes from './routes/transactionRoutes'; // Importeer de transaction routes

const app = express();

// CORS inschakelen voor alle domeinen
app.use(cors());  // Hiermee worden alle domeinen toegestaan om verzoeken naar je server te sturen

app.use(express.json());  // Voor het verwerken van JSON-body's

// Test API-endpoint
app.get('/', (req, res) => {
  res.send('Budget App API draait!');
});

// Gebruik de userRoutes voor gebruikersbeheer
app.use('/api/users', userRoutes);

// Gebruik de routes voor budgetbeheer
app.use('/api/budgets', budgetRoutes);

// Gebruik de routes voor categoriebeheer
app.use('/api/categories', categoryRoutes);

// Gebruik de routes voor transacties
app.use('/api/transactions', transactionRoutes);

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
