import { ApiService } from '../services/apiService';

const registerForm = document.getElementById('signup-form');

if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;
        const usernameElement = document.getElementById('username') as HTMLInputElement;

        if (!emailElement || !passwordElement || !usernameElement) {
            alert('Please fill in all fields.');
            return;
        }

        const email = emailElement.value;
        const password = passwordElement.value;
        const username = usernameElement.value;

        try {
            const result = await ApiService.register(username, email, password); // Call the API service
            alert('Registration successful!');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } catch (error) {
            console.error('Registration failed:', error);
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert('An unknown error occurred.');
            }
        }
    });
}
