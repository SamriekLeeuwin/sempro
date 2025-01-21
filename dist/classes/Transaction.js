"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(transaction_id, user_id, category_id, amount, transaction_date, description, created_at) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.amount = amount;
        this.transaction_date = transaction_date;
        this.description = description;
        this.created_at = created_at;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map