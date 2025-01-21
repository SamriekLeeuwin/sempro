export class Transaction {
    transaction_id: number;
    user_id: number;
    category_id: number;
    amount: number;
    transaction_date: Date;
    description: string;
    created_at: Date;

    constructor(
        transaction_id: number,
        user_id: number,
        category_id: number,
        amount: number,
        transaction_date: Date,
        description: string,
        created_at: Date
    ) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.amount = amount;
        this.transaction_date = transaction_date;
        this.description = description;
        this.created_at = created_at;
    }
}
