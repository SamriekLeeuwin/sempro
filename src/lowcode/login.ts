import { ApiService } from '../services/apiService';

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;

        if (!emailElement || !passwordElement) {
            alert('Please fill in all fields.');
            return;
        }

        const email = emailElement.value;
        const password = passwordElement.value;

        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters.');
            return;
        }

        try {
            const result = await ApiService.login(email, password); // Call the API service
            sessionStorage.setItem('token', result.token);
            sessionStorage.setItem('username', result.username);
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } catch (error) {
            console.error('Login failed:', error);
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert('An unknown error occurred.');
            }
        }
    });
}
