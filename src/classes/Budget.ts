 export class Budget {
    budget_id: number;
    user_id: number;
    category_id: number;
    amount: number;
    month: string; 
    created_at: Date;

    constructor(
        budget_id: number,
        user_id: number,
        category_id: number,
        amount: number,
        month: string,
        created_at: Date
    ) {
        this.budget_id = budget_id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.amount = amount;
        this.month = month;
        this.created_at = created_at;
    }
}
