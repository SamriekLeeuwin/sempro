export class ApiService {
    private static baseUrl = 'http://localhost:3000/api'; // Base URL for the API
    

    /**
     * Generic helper method for making API requests with JSON.
     * @param method - HTTP method (e.g., 'POST', 'GET').
     * @param endpoint - API endpoint to call (e.g., '/users/register').
     * @param body - Optional payload for the request.
     * @returns Parsed JSON response from the server.
     */
    private static async fetchJson(method: string, endpoint: string, body?: any): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`; // Construct the full URL
        const headers = { 'Content-Type': 'application/json' }; // Set headers for JSON

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(url, options); // Make the HTTP request

            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message if available
                throw new Error(errorMessage || `HTTP error ${response.status}`);
            }

            return await response.json(); // Parse and return JSON response
        } catch (error) {
            console.error('API error:', error); // Log the error
            if (error instanceof Error) {
                throw new Error(`API request failed: ${error.message}`);
            } else {
                throw new Error('API request failed');
            }
        }
    }

    /**
     * Register a new user with the API.
     * @param username - The user's chosen username.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns Response data from the server.
     */
    public static async register(username: string, email: string, password: string): Promise<any> {
        return this.fetchJson('POST', '/users/register', { username, email, password });
    }

    /**
     * Log in a user with the API.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns Response data, including a token if successful.
     */
    public static async login(email: string, password: string): Promise<any> {
        return this.fetchJson('POST', '/users/login', { email, password });
    }
}
