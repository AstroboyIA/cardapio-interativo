import { ApiClient } from '../js/apiClient.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    // Evita recarregar a pagina no submit
    e.preventDefault();

    // Le a senha digitada
    const senha = document.getElementById('senha').value;

    try {
        // Faz login e salva token
        await ApiClient.login(senha);
        sessionStorage.setItem('adminLogado', 'true');
        window.location.href = '../painel/painel.html';
    } catch (error) {
        alert('Senha incorreta');
        console.error(error);
    }
});
