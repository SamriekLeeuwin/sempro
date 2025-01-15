"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// Maak een verbinding met de MySQL-database
exports.pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budgetlife',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Test de verbinding
(async () => {
    try {
        const connection = await exports.pool.getConnection();
        console.log('Succesvol verbonden met de MySQL-database');
        connection.release();
    }
    catch (err) {
        console.error('Fout bij verbinden met de database:', err);
    }
})();
//# sourceMappingURL=Database.js.map