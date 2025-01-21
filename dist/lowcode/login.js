"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');
        if (!emailElement || !passwordElement) {
            alert('Email or password element not found');
            return;
        }
        const email = emailElement.value;
        const password = passwordElement.value;
        // Simple validation
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    // Store user data in sessionStorage, including the JWT token
                    sessionStorage.setItem('token', result.token); // Store JWT token
                    sessionStorage.setItem('userId', result.userId);
                    sessionStorage.setItem('username', result.username);
                    sessionStorage.setItem('totalIncome', result.totalIncome?.toString() || '0');
                    sessionStorage.setItem('totalExpenses', result.totalExpenses?.toString() || '0');
                    sessionStorage.setItem('budgetOverview', (result.totalIncome - result.totalExpenses)?.toString() || '0');
                    alert('Login successful!');
                    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
                }
                else {
                    const errorText = await response.text();
                    console.error('Error: Server did not return JSON', errorText);
                    alert('Login failed: Server did not respond with valid data.');
                }
            }
            else {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert('Login failed: ' + errorText);
            }
        }
        catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    });
}
// Event listener for 'Sign In' link
document.getElementById("sign-in-link")?.addEventListener("click", function () {
    const signupContainer = document.getElementById("signup-container");
    if (signupContainer) {
        signupContainer.style.display = "none";
    }
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) {
        loginContainer.style.display = "block";
    }
});
// Event listener for 'Sign Up' link
document.getElementById("sign-up-link")?.addEventListener("click", function () {
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) {
        loginContainer.style.display = "none";
    }
    const signupContainer = document.getElementById("signup-container");
    if (signupContainer) {
        signupContainer.style.display = "block";
    }
});
//# sourceMappingURL=login.js.map