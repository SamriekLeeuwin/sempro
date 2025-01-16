const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;

    if (!emailElement || !passwordElement) {
      alert('Email or password element not found');
      return;
    }

    const email = emailElement.value;
    const password = passwordElement.value;

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
          alert('Login succesvol!');
          window.location.href ='dashboard.html';
        } else {
          // Als de server geen JSON terugstuurt, toon dan de foutmelding
          const errorText = await response.text();
          console.error('Fout bij login: Server reageerde niet met JSON', errorText);
          alert('Login mislukt: Server reageerde niet met een geldig antwoord.');
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert('Login mislukt: ' + errorText);
      }
    } catch (error) {
      console.error('Login fout:', error);
      alert('Er is iets mis gegaan met inloggen.');
    }
  });
}

// Event listener voor 'Sign In' link (om naar het login-formulier te gaan)
document.getElementById("sign-in-link")?.addEventListener("click", function() {
  // Verberg het registratieformulier en toon het loginformulier
  const signupContainer = document.getElementById("signup-container");
  if (signupContainer) {
    signupContainer.style.display = "none";
  }
  const loginContainer = document.getElementById("login-container");
  if (loginContainer) {
    loginContainer.style.display = "block";
  }
});

// Event listener voor 'Sign Up' link (om naar het registratie-formulier te gaan)
document.getElementById("sign-up-link")?.addEventListener("click", function() {
  // Verberg het loginformulier en toon het registratieformulier
  const loginContainer = document.getElementById("login-container");
  if (loginContainer) {
    loginContainer.style.display = "none";
  }
  const signupContainer = document.getElementById("signup-container");
  if (signupContainer) {
    signupContainer.style.display = "block";
  }
});