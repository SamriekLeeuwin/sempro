 export class Category {
    category_id: number;
    user_id: number;
    name: string;
    type: string; 
    created_at: Date;

    constructor(
        category_id: number,
        user_id: number,
        name: string,
        type: string,
        created_at: Date
    ) {
        this.category_id = category_id;
        this.user_id = user_id;
        this.name = name;
        this.type = type;
        this.created_at = created_at;
    }
}
