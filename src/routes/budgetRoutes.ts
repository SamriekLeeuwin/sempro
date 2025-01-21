import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';

const router = Router();

// Haal alle budgetten op
router.get('/', BudgetController.getAllBudgets);

// Haal budget op door user_id
router.get('/:user_id', BudgetController.getBudgetByUserId);

// Voeg een nieuw budget toe
router.post('/', BudgetController.createBudget);

export default router;
