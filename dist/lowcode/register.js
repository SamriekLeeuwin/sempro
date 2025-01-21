"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerForm = document.getElementById('signup-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');
        const usernameElement = document.getElementById('username');
        if (!emailElement || !passwordElement || !usernameElement) {
            alert('Email, password or username element not found');
            return;
        }
        const email = emailElement.value;
        const password = passwordElement.value;
        const username = usernameElement.value;
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }), // Stuur de registratiegegevens
            });
            const result = await response.json();
            if (response.ok) {
                alert('Registratie succesvol!');
                window.location.href = 'dashboard.html'; // Verander deze lijn naar je dashboard.html na succesvolle registratie
            }
            else {
                alert(result.message);
            }
        }
        catch (error) {
            console.error('Registratie fout:', error);
            alert('Er is iets mis gegaan met registreren.');
        }
    });
}
//# sourceMappingURL=register.js.map