"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Library used for working with JSON Web Tokens (JWTs).
// A secret key used to sign and verify tokens. Replace this with a strong, secure key in your real application.
const secretKey = 'your_secret_key';
// Middleware to check if the user is authenticated by validating their token.
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header. It is usually in the format: "Bearer <token>"
    const token = req.headers['authorization']?.split(' ')[1];
    // If no token is provided, deny access.
    if (!token) {
        res.status(401).json({ error: 'Access denied, no token provided' }); // 401 means unauthorized.
        return; // Stop further processing after sending a response.
    }
    try {
        // Verify the token using the secret key. If valid, decode it.
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Attach the decoded token (user data) to the request object for use in the next middleware or route handler.
        req.user = decoded;
        // Call next() to move to the next middleware or route.
        next();
    }
    catch (err) {
        // If the token is invalid or expired, send a 400 (bad request) response.
        res.status(400).json({ error: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map