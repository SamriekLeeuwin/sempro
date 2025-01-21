import { Request, Response } from 'express';
import { BudgetService } from '../services/budgetService';

export class BudgetController {
    // Haal alle budgetten op (GET)
    static async getAllBudgets(req: Request, res: Response) {
        try {
            const budgets = await BudgetService.getAllBudgets();
            res.json(budgets);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch budgets' });
        }
    }

    // Haal budget op door user_id (GET)
    static async getBudgetByUserId(req: Request, res: Response) {
        const { user_id } = req.params;
        try {
            const budget = await BudgetService.getBudgetByUserId(Number(user_id));
            res.json(budget);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch budget' });
        }
    }

    // Voeg een nieuw budget toe (POST)
    static async createBudget(req: Request, res: Response) {
        const { user_id, category_id, amount, month } = req.body;
        try {
            const budget = await BudgetService.createBudget(user_id, category_id, amount, month);
            res.status(201).json(budget);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create budget' });
        }
    }
}
