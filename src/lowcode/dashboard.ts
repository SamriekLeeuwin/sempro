import { ApiService } from '../services/apiService';

async function loadDashboardData() {
    const userId = sessionStorage.getItem('user_id');
    const username = sessionStorage.getItem('username');

    if (!userId) {
        console.error('Geen user_id gevonden.');
        return;
    }

    // Zet gebruikersnaam in UI
    const usernameDisplay = document.getElementById('username');
    if (usernameDisplay && username) {
        usernameDisplay.innerText = username;
    }

    try {
        const budgetData = await ApiService.getBudgets(userId);
        const transactionData = await ApiService.getTransactions(userId);

        const income = Number(budgetData.totalIncome || 0);
        const expenses = Number(budgetData.totalExpenses || 0);
        const overview = income - expenses;

        document.getElementById('totalIncome')!.innerText = `Inkomsten: €${income.toFixed(2)}`;
        document.getElementById('totalExpenses')!.innerText = `Uitgaven: €${expenses.toFixed(2)}`;
        document.getElementById('budgetOverview')!.innerText = `Overzicht: €${overview.toFixed(2)}`;
    } catch (error) {
        console.error('Fout bij ophalen dashboardgegevens:', error);
    }
}

window.addEventListener('DOMContentLoaded', loadDashboardData);
