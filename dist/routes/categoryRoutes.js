"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
// Haal alle categorieën op
router.get('/', categoryController_1.CategoryController.getAllCategories);
// Voeg een nieuwe categorie toe
router.post('/', categoryController_1.CategoryController.createCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map