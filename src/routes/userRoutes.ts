import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

// Haal alle gebruikers op (GET)
router.get('/', UserController.getAllUsers);

// Inloggen (POST)
router.post('/login', UserController.getUserByEmailAndPassword); // POST /api/users/login for login

// Registreren (POST)
router.post('/register', UserController.createUser); // POST /api/users/register for creating a new user

export default router;
