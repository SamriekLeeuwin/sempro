// User class represents a user with essential information like username, email, password, and userId.
export class User {
    public userId: number; // Unique identifier for the user
    public username: string; // The user's username
    public email: string; // The user's email address
    private _password: string; // The user's hashed password

    // Constructor to initialize the User object with required details
    constructor(userId: number, username: string, email: string, password: string) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this._password = password; 
    }

    public get password(): string {
        return this._password;
    }
}


// Function to validate if an email address is in a correct format using regular expression
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern to match a valid email address
    return emailRegex.test(email); // Returns true if the email matches the regex pattern
};

// Function to validate if the password meets certain security requirements
// Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character
// It must be at least 8 characters long
export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password); // Returns true if the password matches the regex pattern
};

export default User; // Export the User class for use in other modules
