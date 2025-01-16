# Budget App Backend (Werk in Uitvoering)

## Beschrijving
Dit project is de backend voor een budgetbeheer-app waarmee gebruikers hun financiën kunnen beheren. De app biedt functionaliteit zoals inloggen, registreren en gebruikersgegevens opslaan in een MySQL-database. Het maakt gebruik van Node.js, Express en MySQL.

## Huidige Status
Het project is nog in ontwikkeling. De basisfunctionaliteiten zoals inloggen en registreren werken, maar er zijn nog enkele verbeteringen en extra functionaliteiten die moeten worden toegevoegd.

## Wat is al voltooid:
- Gebruikers kunnen zich registreren en inloggen via een API.
- Er wordt een MySQL-database gebruikt voor het opslaan van gebruikersinformatie.
- CORS-problemen zijn opgelost voor communicatie tussen frontend en backend.

## Wat nog te doen is:
1. Wachtwoordbeveiliging met bcrypt voor het veilig opslaan van wachtwoorden.
2. Implementeren van JWT voor veilige token-gebaseerde authenticatie.
3. Validatie van gebruikersinvoer (bijvoorbeeld email en wachtwoord).
4. Toevoegen van budget- en uitgavenbeheer functionaliteit.

## Problemen en Oplossingen:
- **CORS-problemen**: In het begin waren er CORS-problemen tussen de frontend en de backend. Dit werd opgelost door CORS middleware toe te voegen aan de backend.
- **Fout bij fetch-aanroepen**: Bij het testen van de frontend-fetch-aanroepen werden er fouten weergegeven. Dit werd opgelost door de juiste URL's in de frontend te configureren.

## Toekomstige verbeteringen:
- Het verbeteren van de foutafhandelingsmeldingen op de frontend.
- Het toevoegen van functionaliteit om budgetten en uitgaven te beheren.
- Meer uitgebreide gebruikersvalidatie.

## Installatie en Gebruik:
1. Clone dit repository naar je lokale machine.
2. Installeer de dependencies met `npm install`.
3. Start de server met `npm start`.
4. De server draait nu op `http://localhost:3000`.

## Licentie:
Dit project is open source en beschikbaar onder de MIT-licentie.

## Credits:
- Gebouwd door Samriek Leeuwin.
