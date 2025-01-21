"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
class Budget {
    constructor(budget_id, user_id, category_id, amount, month, created_at) {
        this.budget_id = budget_id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.amount = amount;
        this.month = month;
        this.created_at = created_at;
    }
}
exports.Budget = Budget;
//# sourceMappingURL=Budget.js.map