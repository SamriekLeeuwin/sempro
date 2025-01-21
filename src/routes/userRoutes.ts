// filepath: /c:/Users/Lenovo/sempro/src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Haal alle gebruikers op (GET)
router.get('/', authMiddleware, UserController.getAllUsers);

// Inloggen (POST)
router.post('/login', UserController.getUserByEmailAndPassword);

// Registreren (POST)
router.post('/register', UserController.createUser);

export default router;