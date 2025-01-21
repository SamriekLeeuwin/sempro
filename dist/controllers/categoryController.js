"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryService_1 = require("../services/categoryService");
class CategoryController {
    // Haal alle categorieën op (GET)
    static async getAllCategories(req, res) {
        try {
            const categories = await categoryService_1.CategoryService.getAllCategories();
            res.json(categories);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }
    // Voeg een nieuwe categorie toe (POST)
    static async createCategory(req, res) {
        const { user_id, name, type } = req.body;
        try {
            const category = await categoryService_1.CategoryService.createCategory(user_id, name, type);
            res.status(201).json(category);
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map