"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /c:/Users/Lenovo/sempro/src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Haal alle gebruikers op (GET)
router.get('/', authMiddleware_1.authMiddleware, userController_1.UserController.getAllUsers);
// Inloggen (POST)
router.post('/login', userController_1.UserController.getUserByEmailAndPassword);
// Registreren (POST)
router.post('/register', userController_1.UserController.createUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map