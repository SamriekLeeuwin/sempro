"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Voeg CORS-import toe
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const budgetRoutes_1 = __importDefault(require("../src/routes/budgetRoutes")); // Importeer de budget routes
const categoryRoutes_1 = __importDefault(require("../src/routes/categoryRoutes")); // Importeer de category routes
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes")); // Importeer de transaction routes
const app = (0, express_1.default)();
// CORS inschakelen voor alle domeinen
app.use((0, cors_1.default)()); // Hiermee worden alle domeinen toegestaan om verzoeken naar je server te sturen
app.use(express_1.default.json()); // Voor het verwerken van JSON-body's
// Test API-endpoint
app.get('/', (req, res) => {
    res.send('Budget App API draait!');
});
// Gebruik de userRoutes voor gebruikersbeheer
app.use('/api/users', userRoutes_1.default);
// Gebruik de routes voor budgetbeheer
app.use('/api/budgets', budgetRoutes_1.default);
// Gebruik de routes voor categoriebeheer
app.use('/api/categories', categoryRoutes_1.default);
// Gebruik de routes voor transacties
app.use('/api/transactions', transactionRoutes_1.default);
// Start de server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map