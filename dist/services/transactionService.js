import { pool } from '../../dist/utils/Database.js';
import { Transaction } from '../../dist/classes/Transaction.js';
export const TransactionService = {
    // Haal alle transacties op
    async getAllTransactions() {
        try {
            const query = 'SELECT * FROM transactions';
            const [rows] = await pool.query(query);
            return rows.map(row => new Transaction(row.transaction_id, row.user_id, row.category_id, row.amount, row.transaction_date, row.description, row.created_at));
        }
        catch (err) {
            throw new Error('Error in getAllTransactions');
        }
    },
    // Voeg een nieuwe transactie toe
    async createTransaction(user_id, category_id, amount, transaction_date, description) {
        try {
            const query = 'INSERT INTO transactions (user_id, category_id, amount, transaction_date, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [user_id, category_id, amount, transaction_date, description]);
            const transaction_id = result.insertId;
            return new Transaction(transaction_id, user_id, category_id, amount, transaction_date, description, new Date());
        }
        catch (err) {
            throw new Error('Error in createTransaction');
        }
    }
};
