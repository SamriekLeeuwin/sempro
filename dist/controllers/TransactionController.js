import { TransactionService } from '../../dist/services/TransactionService.js';
export class TransactionController {
    // Haal alle transacties op (GET)
    static async getAllTransactions(req, res) {
        try {
            const transactions = await TransactionService.getAllTransactions();
            res.json(transactions);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch transactions' });
        }
    }
    // Voeg een nieuwe transactie toe (POST)
    static async createTransaction(req, res) {
        const { user_id, category_id, amount, transaction_date, description } = req.body;
        try {
            const transaction = await TransactionService.createTransaction(user_id, category_id, amount, transaction_date, description);
            res.status(201).json(transaction);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to create transaction' });
        }
    }
}
