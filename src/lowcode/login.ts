import { ApiService } from '../services/apiService';
import { isValidEmail } from '../classes/User'; // Alleen e-mailvalidatie importeren

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailElement = document.getElementById('email-login') as HTMLInputElement;
        const passwordElement = document.getElementById('password-login') as HTMLInputElement;

        if (!emailElement || !passwordElement) {
            alert('Vul alle velden in.');
            return;
        }

        const email = emailElement.value.trim();
        const password = passwordElement.value;

        // ✅ Alleen e-mail valideren
        if (!isValidEmail(email)) {
            alert('Voer een geldig e-mailadres in.');
            return;
        }


        try {
            const result = await ApiService.login(email, password);

            // ✅ Sla gegevens op in sessionStorage
            sessionStorage.setItem('token', result.token);
            sessionStorage.setItem('username', result.username);
            sessionStorage.setItem('user_id', result.user_id);

            alert('Login gelukt!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Login mislukt:', error);
            if (error instanceof Error) {
                alert(`Fout: ${error.message}`);
            } else {
                alert('Er is een onbekende fout opgetreden.');
            }
        }
    });
}
