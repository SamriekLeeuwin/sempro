"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../../src/services/userService");
exports.UserController = {
    async getAllUsers(_req, res) {
        try {
            const users = await userService_1.UserService.getAllUsers();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err.message });
        }
    },
    async getUserByEmailAndPassword(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userService_1.UserService.getUserByEmailAndPassword(email, password);
            if (user) {
                res.json(user);
            }
            else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    },
    async createUser(req, res) {
        const { username, email, password } = req.body;
        try {
            const newUser = await userService_1.UserService.createUser(username, email, password);
            res.status(201).json({ message: 'User created', user: newUser });
        }
        catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
};
//# sourceMappingURL=userController.js.map