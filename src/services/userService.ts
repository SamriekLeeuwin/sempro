import { RowDataPacket } from 'mysql2';
import { pool } from '../utils/Database';
import { User }  from '../classes/User';

export const UserService = {
    // Fetch all users
    async getAllUsers(): Promise<User[]> {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await pool.query<RowDataPacket[]>(query);

            return rows.map(row => new User(row.username, row.email, row.password, row.user_id));
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
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            const [rows] = await pool.query<RowDataPacket[]>(query, [email, password]);

            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }

            const row = rows[0];
            return new User(row.username, row.email, row.password, row.user_id);
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
            // We voegen created_at toe, hoewel de database het automatisch kan doen als DEFAULT CURRENT_TIMESTAMP is ingesteld.
            const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [username, email, password]);

            const userId = (result as any).insertId;
            return new User(username, email, password, userId);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in createUser: ${err.message}`);
            }
            throw new Error('Unknown error in createUser');
        }
    }
};