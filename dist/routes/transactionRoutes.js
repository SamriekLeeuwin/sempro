import { Router } from 'express';
import { TransactionController } from '../../dist/controllers/TransactionController.js';
const router = Router();
// Haal alle transacties op
router.get('/', TransactionController.getAllTransactions);
// Voeg een nieuwe transactie toe
router.post('/', TransactionController.createTransaction);
export default router;
