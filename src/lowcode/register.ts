import { ApiService } from '../services/apiService';
import { isValidEmail, isValidPassword } from '../classes/User';

const registerForm = document.getElementById('signup-form');

if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;
        const usernameElement = document.getElementById('username') as HTMLInputElement;

        if (!emailElement || !passwordElement || !usernameElement) {
            alert('Vul alle velden in.');
            return;
        }

        const email = emailElement.value.trim();
        const password = passwordElement.value;
        const username = usernameElement.value.trim();

        // ✅ Voeg validaties toe
        if (!isValidEmail(email)) {
            alert('Voer een geldig e-mailadres in.');
            return;
        }

        if (!isValidPassword(password)) {
            alert('Wachtwoord moet minstens 8 tekens bevatten, inclusief een hoofdletter, kleine letter, cijfer en speciaal teken.');
            return;
        }

        try {
            const result = await ApiService.register(username, email, password);
            alert('Registratie gelukt!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Registratie mislukt:', error);
            if (error instanceof Error) {
                alert(`Fout: ${error.message}`);
            } else {
                alert('Er is een onbekende fout opgetreden.');
            }
        }
    });
}
