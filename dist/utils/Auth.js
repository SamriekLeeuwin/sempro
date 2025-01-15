"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Database_1 = require("../utils/Database");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Voor JSON-body parsing
// Test API-endpoint
app.get('/', (req, res) => {
    res.send('Budget App API draait!');
});
// Endpoint om gebruikers op te halen
app.get('/users', async (req, res) => {
    try {
        const [rows] = await Database_1.pool.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Fout bij ophalen van gebruikers', details: err });
    }
});
// Start de server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
//# sourceMappingURL=Auth.js.map