import { UserService } from '../../dist/services/userService.js';
import jwt from 'jsonwebtoken';
const secretKey = 'your_secret_key'; // Replace with your actual secret key
export const UserController = {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getUserByEmailAndPassword(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserService.getUserByEmailAndPassword(email, password);
            if (user) {
                const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
                res.json({ token, userId: user.userId, username: user.username });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async createUser(req, res) {
        const { username, email, password } = req.body;
        try {
            const user = await UserService.createUser(username, email, password);
            const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
            res.status(201).json({ token, userId: user.userId, username: user.username });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
