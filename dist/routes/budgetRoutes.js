"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BudgetController_1 = require("../controllers/BudgetController");
const router = (0, express_1.Router)();
// Haal alle budgetten op
router.get('/', BudgetController_1.BudgetController.getAllBudgets);
// Haal budget op door user_id
router.get('/:user_id', BudgetController_1.BudgetController.getBudgetByUserId);
// Voeg een nieuw budget toe
router.post('/', BudgetController_1.BudgetController.createBudget);
exports.default = router;
//# sourceMappingURL=budgetRoutes.js.map