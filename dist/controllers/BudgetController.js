import { BudgetService } from '../../dist/services/BudgetService.js';
export class BudgetController {
    // Haal alle budgetten op (GET)
    static async getAllBudgets(req, res) {
        try {
            const budgets = await BudgetService.getAllBudgets();
            res.json(budgets);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch budgets' });
        }
    }
    // Haal budget op door user_id (GET)
    static async getBudgetByUserId(req, res) {
        const { user_id } = req.params;
        try {
            const budget = await BudgetService.getBudgetByUserId(Number(user_id));
            res.json(budget);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch budget' });
        }
    }
    // Voeg een nieuw budget toe (POST)
    static async createBudget(req, res) {
        const { user_id, category_id, amount, month } = req.body;
        try {
            const budget = await BudgetService.createBudget(user_id, category_id, amount, month);
            res.status(201).json(budget);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to create budget' });
        }
    }
}
