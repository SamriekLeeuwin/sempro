import { Request, Response } from 'express';
import { UserService } from '../../src/services/userService';

export const UserController = {
    async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err: any) {
            res.status(500).json({ message: 'Error retrieving users', error: err.message });
        }
    },

    async getUserByEmailAndPassword(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await UserService.getUserByEmailAndPassword(email, password);
            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (err: any) {
            res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    },

    async createUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        try {
            const newUser = await UserService.createUser(username, email, password);
            res.status(201).json({ message: 'User created', user: newUser });
        } catch (err: any) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
};
