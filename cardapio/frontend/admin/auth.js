import { ApiClient } from '../js/apiClient.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const senha = document.getElementById('senha').value;

    try {
        await ApiClient.login(senha);
        sessionStorage.setItem('adminLogado', 'true');
        window.location.href = '../painel/painel.html';
    } catch (error) {
        alert('Senha incorreta');
        console.error(error);
    }
});
