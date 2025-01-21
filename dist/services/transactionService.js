"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const Database_1 = require("../utils/Database");
const Transaction_1 = require("../classes/Transaction");
exports.TransactionService = {
    // Haal alle transacties op
    async getAllTransactions() {
        try {
            const query = 'SELECT * FROM transactions';
            const [rows] = await Database_1.pool.query(query);
            return rows.map(row => new Transaction_1.Transaction(row.transaction_id, row.user_id, row.category_id, row.amount, row.transaction_date, row.description, row.created_at));
        }
        catch (err) {
            throw new Error('Error in getAllTransactions');
        }
    },
    // Voeg een nieuwe transactie toe
    async createTransaction(user_id, category_id, amount, transaction_date, description) {
        try {
            const query = 'INSERT INTO transactions (user_id, category_id, amount, transaction_date, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
            const [result] = await Database_1.pool.execute(query, [user_id, category_id, amount, transaction_date, description]);
            const transaction_id = result.insertId;
            return new Transaction_1.Transaction(transaction_id, user_id, category_id, amount, transaction_date, description, new Date());
        }
        catch (err) {
            throw new Error('Error in createTransaction');
        }
    }
};
//# sourceMappingURL=transactionService.js.map