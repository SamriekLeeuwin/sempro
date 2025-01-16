"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Voeg CORS-import toe
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// CORS inschakelen voor alle domeinen
app.use((0, cors_1.default)()); // Hiermee worden alle domeinen toegestaan om verzoeken naar je server te sturen
app.use((0, cors_1.default)({ origin: 'http://127.0.0.1:5500' }));
app.use(express_1.default.json()); // Voor het verwerken van JSON-body's
// Test API-endpoint
app.get('/', (req, res) => {
    res.send('Budget App API draait!');
});
// Gebruik de userRoutes
app.use('/api/users', userRoutes_1.default); // Gebruik /api/users als basisroute voor gebruikersroutes
// Start de server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map