import { pool } from '../../dist/utils/Database.js';
import { User } from '../../dist/classes/User.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;
export const UserService = {
    // Fetch all users
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await pool.query(query);
            return rows.map(row => new User(row.username, row.email, row.password, row.user_id));
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
            const [rows] = await pool.query(query, [email]);
            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }
            const row = rows[0];
            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            return new User(row.username, row.email, row.password, row.user_id);
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
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [username, email, hashedPassword]);
            const userId = result.insertId;
            return new User(userId, username, email, hashedPassword);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in createUser: ${err.message}`);
            }
            throw new Error('Unknown error in createUser');
        }
    }
};
