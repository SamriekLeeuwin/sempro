import { pool } from '../../dist/utils/Database.js';
import { Budget } from '../../dist/classes/Budget.js';
class ServiceError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'ServiceError';
    }
}
export const BudgetService = {
    // Haal alle budgetten op
    async getAllBudgets() {
        try {
            const query = 'SELECT * FROM budgets';
            const [rows] = await pool.query(query);
            return rows.map(row => new Budget(row.budget_id, row.user_id, row.category_id, row.amount, row.month, row.created_at));
        }
        catch (err) {
            throw new ServiceError(`Error in getAllBudgets:`, 500);
        }
    },
    // Haal budget op door user_id
    async getBudgetByUserId(user_id) {
        if (!user_id) {
            throw new ServiceError('Missing user_id parameter', 400);
        }
        try {
            const query = 'SELECT * FROM budgets WHERE user_id = ?';
            const [rows] = await pool.query(query, [user_id]);
            return rows.map(row => new Budget(row.budget_id, row.user_id, row.category_id, row.amount, row.month, row.created_at));
        }
        catch (err) {
            throw new ServiceError(`Error in getBudgetByUserId: `, 500);
        }
    },
    // Voeg een nieuw budget toe
    async createBudget(user_id, category_id, amount, month) {
        if (!user_id || !category_id || !amount || !month) {
            throw new ServiceError('Missing input for createBudget', 400);
        }
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const query = 'INSERT INTO budgets (user_id, category_id, amount, month, created_at) VALUES (?, ?, ?, ?, NOW())';
            const [result] = await connection.execute(query, [user_id, category_id, amount, month]);
            const budget_id = result.insertId;
            await connection.commit();
            return new Budget(budget_id, user_id, category_id, amount, month, new Date());
        }
        catch (err) {
            await connection.rollback();
            throw new ServiceError(`Error in createBudget: `, 500);
        }
        finally {
            connection.release();
        }
    }
};
