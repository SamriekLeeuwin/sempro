import { RowDataPacket } from 'mysql2';
import { pool } from '../utils/Database';
import { Transaction } from '../classes/Transaction';

export const TransactionService = {
    // Haal alle transacties op
    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const query = 'SELECT * FROM transactions';
            const [rows] = await pool.query<RowDataPacket[]>(query);
            return rows.map(row => new Transaction(row.transaction_id, row.user_id, row.category_id, row.amount, row.transaction_date, row.description, row.created_at));
        } catch (err) {
            throw new Error('Error in getAllTransactions');
        }
    },

    // Voeg een nieuwe transactie toe
    async createTransaction(user_id: number, category_id: number, amount: number, transaction_date: Date, description: string): Promise<Transaction> {
        try {
            const query = 'INSERT INTO transactions (user_id, category_id, amount, transaction_date, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [user_id, category_id, amount, transaction_date, description]);
            const transaction_id = (result as any).insertId;
            return new Transaction(transaction_id, user_id, category_id, amount, transaction_date, description, new Date());
        } catch (err) {
            throw new Error('Error in createTransaction');
        }
    }
};
