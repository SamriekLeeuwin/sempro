"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.isValidEmail = exports.User = void 0;
// User class represents a user with essential information like username, email, password, and userId.
class User {
    // Constructor to initialize the User object with required details
    constructor(userId, username, email, password) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        this._password = bcrypt.hashSync(password, saltRounds);
    }
}
exports.User = User;
// Function to validate if an email address is in a correct format using regular expression
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern to match a valid email address
    return emailRegex.test(email); // Returns true if the email matches the regex pattern
};
exports.isValidEmail = isValidEmail;
// Function to validate if the password meets certain security requirements
// Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character
// It must be at least 8 characters long
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password); // Returns true if the password matches the regex pattern
};
exports.isValidPassword = isValidPassword;
exports.default = User; // Export the User class for use in other modules
//# sourceMappingURL=User.js.map