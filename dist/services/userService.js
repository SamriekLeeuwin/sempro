"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Database_1 = require("../utils/Database");
const User_1 = require("../classes/User");
exports.UserService = {
    // Fetch all users
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await Database_1.pool.query(query);
            return rows.map(row => new User_1.User(row.username, row.email, row.password, row.user_id));
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in getAllUsers: ${err.message}`);
            }
            throw new Error('Unknown error in getAllUsers');
        }
    },
    // Fetch user by email and password
    async getUserByEmailAndPassword(email, password) {
        try {
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            const [rows] = await Database_1.pool.query(query, [email, password]);
            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }
            const row = rows[0];
            return new User_1.User(row.username, row.email, row.password, row.user_id);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in getUserByEmailAndPassword: ${err.message}`);
            }
            throw new Error('Unknown error in getUserByEmailAndPassword');
        }
    },
    // Create a new user
    async createUser(username, email, password) {
        try {
            // We voegen created_at toe, hoewel de database het automatisch kan doen als DEFAULT CURRENT_TIMESTAMP is ingesteld.
            const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await Database_1.pool.execute(query, [username, email, password]);
            const userId = result.insertId;
            return new User_1.User(username, email, password, userId);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in createUser: ${err.message}`);
            }
            throw new Error('Unknown error in createUser');
        }
    }
};
//# sourceMappingURL=userService.js.map