"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Haal alle gebruikers op (GET)
router.get('/', userController_1.UserController.getAllUsers);
// Inloggen (POST)
router.post('/login', userController_1.UserController.getUserByEmailAndPassword); // POST /api/users/login for login
// Registreren (POST)
router.post('/register', userController_1.UserController.createUser); // POST /api/users/register for creating a new user
exports.default = router;
//# sourceMappingURL=userRoutes.js.map