// User class represents a user with essential information like username, email, password, and userId.
export class User {
    userId; // Unique identifier for the user
    username; // The user's username
    email; // The user's email address
    _password; // The user's hashed password
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
// Function to validate if an email address is in a correct format using regular expression
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern to match a valid email address
    return emailRegex.test(email); // Returns true if the email matches the regex pattern
};
// Function to validate if the password meets certain security requirements
// Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character
// It must be at least 8 characters long
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password); // Returns true if the password matches the regex pattern
};
export default User; // Export the User class for use in other modules
export { isValidEmail, isValidPassword }; // Export the validation functions for use in other modules
