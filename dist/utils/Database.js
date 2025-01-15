"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Laad de .env-variabelen
dotenv_1.default.config();
// Maak een verbinding met de MySQL-database
exports.pool = promise_1.default.createPool({
    host: process.env.DB_HOST, // 'localhost'
    user: process.env.DB_USER, // 'root'
    password: process.env.DB_PASSWORD || '', // Leeg wachtwoord
    database: process.env.DB_NAME, // 'budget_app'
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Test de verbinding (optioneel)
(async () => {
    try {
        const connection = await exports.pool.getConnection();
        console.log('Verbinding succesvol!');
        connection.release();
    }
    catch (err) {
        console.error('Verbinding mislukt:', err);
    }
})();
//# sourceMappingURL=Database.js.map