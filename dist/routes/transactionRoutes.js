"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionController_1 = require("../controllers/TransactionController");
const router = (0, express_1.Router)();
// Haal alle transacties op
router.get('/', TransactionController_1.TransactionController.getAllTransactions);
// Voeg een nieuwe transactie toe
router.post('/', TransactionController_1.TransactionController.createTransaction);
exports.default = router;
//# sourceMappingURL=transactionRoutes.js.map