export class Category {
    category_id;
    user_id;
    name;
    type;
    created_at;
    constructor(category_id, user_id, name, type, created_at) {
        this.category_id = category_id;
        this.user_id = user_id;
        this.name = name;
        this.type = type;
        this.created_at = created_at;
    }
}
