// filepath: /c:/Users/Lenovo/sempro/src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';


export const UserController = {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    },

    async getUserByEmailAndPassword(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await UserService.getUserByEmailAndPassword(email, password);
            if (user) {
                const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
                res.json({ token, userId: user.userId, username: user.username });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    },
    async createUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        console.log('Geregistreerde data:', { username, email, password }); // 👈 log de input
      
        try {
          const user = await UserService.createUser(username, email, password);
          const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
          res.status(201).json({ token, userId: user.userId, username: user.username });
        } catch (err) {
          console.error('Fout tijdens registreren:', err); // 👈 log backend error
          res.status(500).json({ error: (err as Error).message });
        }
      }
      
};
