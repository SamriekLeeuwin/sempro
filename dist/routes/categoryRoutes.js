import { Router } from 'express';
import { CategoryController } from '../../dist/controllers/categoryController.js';
const router = Router();
// Haal alle categorieën op
router.get('/', CategoryController.getAllCategories);
// Voeg een nieuwe categorie toe
router.post('/', CategoryController.createCategory);
export default router;
