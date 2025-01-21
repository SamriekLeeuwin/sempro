"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your_secret_key'; // Replace with your actual secret key
exports.UserController = {
    async getAllUsers(req, res) {
        try {
            const users = await userService_1.UserService.getAllUsers();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getUserByEmailAndPassword(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userService_1.UserService.getUserByEmailAndPassword(email, password);
            if (user) {
                const token = jsonwebtoken_1.default.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
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
            const user = await userService_1.UserService.createUser(username, email, password);
            const token = jsonwebtoken_1.default.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
            res.status(201).json({ token, userId: user.userId, username: user.username });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
//# sourceMappingURL=userController.js.map