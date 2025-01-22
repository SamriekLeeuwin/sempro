export class Budget {
    budget_id;
    user_id;
    category_id;
    amount;
    month;
    created_at;
    constructor(budget_id, user_id, category_id, amount, month, created_at) {
        this.budget_id = budget_id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.amount = amount;
        this.month = month;
        this.created_at = created_at;
    }
}
