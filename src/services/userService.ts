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
    
            console.log('Rows fetched from the database:', rows);
    
            return rows.map(row => {
                let password: string;
                // Controleer of het wachtwoord al gehashed is, anders hash het
                if (row.password && row.password.startsWith('$2b$')) {
                    password = row.password;  // Gehasht wachtwoord
                } else {
                    // Dit betekent dat het wachtwoord niet gehasht is (tekst)
                    password = bcrypt.hashSync(row.password, 10);  // Hash het wachtwoord
                }
    
                console.log('Mapping row to User object:', row);
    
                return new User(row.username, row.email, password, row.user_id);
            });
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error in getAllUsers: ${err.message}`);
            }
            throw new Error('Unknown error in getAllUsers');
        }
    }
    
,    

    // Fetch user by email and password
    async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await pool.query<RowDataPacket[]>(query, [email]);
    
            if (rows.length === 0) {
                throw new Error('Invalid credentials');
            }
    
            const row = rows[0];
            console.log('Stored password hash:', row.password);  // Log de opgeslagen hash
            console.log('Input password:', password);  // Log het ingevoerde wachtwoord
            
            // Zorg ervoor dat de wachtwoorden correct worden vergeleken
            if (typeof row.password !== 'string' || typeof password !== 'string') {
                throw new Error('Invalid password format');
            }
    
            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
    
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
            // Zorg ervoor dat de wachtwoordhash correct wordt gegenereerd
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log('Generated hashed password:', hashedPassword);  // Log de gegenereerde hash
    
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