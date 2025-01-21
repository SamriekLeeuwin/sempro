"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Database_1 = require("../utils/Database");
const Category_1 = require("../classes/Category");
exports.CategoryService = {
    // Haal alle categorieën op
    async getAllCategories() {
        try {
            const query = 'SELECT * FROM categories';
            const [rows] = await Database_1.pool.query(query);
            return rows.map(row => new Category_1.Category(row.category_id, row.user_id, row.name, row.type, row.created_at));
        }
        catch (err) {
            throw new Error('Error in getAllCategories');
        }
    },
    // Voeg een nieuwe categorie toe
    async createCategory(user_id, name, type) {
        try {
            const query = 'INSERT INTO categories (user_id, name, type, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await Database_1.pool.execute(query, [user_id, name, type]);
            const category_id = result.insertId;
            return new Category_1.Category(category_id, user_id, name, type, new Date());
        }
        catch (err) {
            throw new Error('Error in createCategory');
        }
    }
};
//# sourceMappingURL=categoryService.js.map