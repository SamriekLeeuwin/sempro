"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Database_1 = require("../utils/Database");
const User_1 = require("../classes/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
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
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await Database_1.pool.query(query, [email]);
            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }
            const row = rows[0];
            const isPasswordValid = await bcrypt_1.default.compare(password, row.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
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
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await Database_1.pool.execute(query, [username, email, hashedPassword]);
            const userId = result.insertId;
            return new User_1.User(userId, username, email, hashedPassword);
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