export class Transaction {
    transaction_id;
    user_id;
    category_id;
    amount;
    transaction_date;
    description;
    created_at;
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
