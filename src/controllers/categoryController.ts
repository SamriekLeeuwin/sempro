import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
    // Haal alle categorieën op (GET)
    static async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }

    // Voeg een nieuwe categorie toe (POST)
    static async createCategory(req: Request, res: Response) {
        const { user_id, name, type } = req.body;
        try {
            const category = await CategoryService.createCategory(user_id, name, type);
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    }
}
