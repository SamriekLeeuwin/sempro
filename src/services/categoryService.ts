import { RowDataPacket } from 'mysql2';
import { pool } from '../utils/Database';
import { Category } from '../classes/Category';

export const CategoryService = {
    // Haal alle categorieën op
    async getAllCategories(): Promise<Category[]> {
        try {
            const query = 'SELECT * FROM categories';
            const [rows] = await pool.query<RowDataPacket[]>(query);
            return rows.map(row => new Category(row.category_id, row.user_id, row.name, row.type, row.created_at));
        } catch (err) {
            throw new Error('Error in getAllCategories');
        }
    },

    // Voeg een nieuwe categorie toe
    async createCategory(user_id: number, name: string, type: string): Promise<Category> {
        try {
            const query = 'INSERT INTO categories (user_id, name, type, created_at) VALUES (?, ?, ?, NOW())';
            const [result] = await pool.execute(query, [user_id, name, type]);
            const category_id = (result as any).insertId;
            return new Category(category_id, user_id, name, type, new Date());
        } catch (err) {
            throw new Error('Error in createCategory');
        }
    }
};
