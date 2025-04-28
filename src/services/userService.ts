// filepath: /c:/Users/Lenovo/sempro/src/services/userService.ts

import { RowDataPacket } from 'mysql2';
import { pool } from '../utils/Database';
import { User } from '../classes/User';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const UserService = {
    // Fetch all users
    async getAllUsers(): Promise<User[]> {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await pool.query<RowDataPacket[]>(query);

            return rows.map(row => {
                return new User(row.user_id, row.username, row.email, row.password);
            });
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in getAllUsers: ${err.message}`);
            }
            throw new Error('Unknown error in getAllUsers');
        }
    },

    // Fetch user by email and password
    async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await pool.query<RowDataPacket[]>(query, [email]);

            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }

            const row = rows[0];

            if (!row.password || typeof row.password !== 'string' || !row.password.startsWith('$2b$')) {
                throw new Error('Stored password is not a valid bcrypt hash');
            }

            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            return new User(row.user_id, row.username, row.email, row.password);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in getUserByEmailAndPassword: ${err.message}`);
            }
            throw new Error('Unknown error in getUserByEmailAndPassword');
        }
    },

    // Create a new user
    async createUser(username: string, email: string, password: string): Promise<User> {
        try {
            // Minimale wachtwoordlengte controleren
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [username, email, hashedPassword]);

            const userId = (result as any).insertId;
            return new User(userId, username, email, hashedPassword);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in createUser: ${err.message}`);
            }
            throw new Error('Unknown error in createUser');
        }
    }
};
