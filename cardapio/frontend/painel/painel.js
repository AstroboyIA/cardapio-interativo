import { ApiClient } from '../js/apiClient.js';

if (!sessionStorage.getItem('adminLogado')) {
    window.location.href = '../index.html';
}

document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('adminLogado');
    window.location.href = '../index.html';
});

async function renderizarAdmin(idContainer, chaveStorage) { 
    const container = document.getElementById(idContainer);
    if (!container) return;

    container.innerHTML = 'Carregando...';

    const drinks = await ApiClient.getDrinks(chaveStorage);
    container.innerHTML = '';

    drinks.forEach((drink) => {
        const linha = document.createElement('div');
        linha.classList.add('admin-drink');
        linha.innerHTML = `
            <span>${drink.nome}</span>
            <label class="switch">
                <input type="checkbox" ${drink.ativo ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        `;
        const checkbox = linha.querySelector('input');
        checkbox.addEventListener('change', async () => {
            await ApiClient.atualizarDrink(drink.id, {
                ativo: checkbox.checked
            });
        });
        container.appendChild(linha);
    });
}

renderizarAdmin('admin-classicos', 'drinksClassicos');
renderizarAdmin('admin-autorais', 'drinksAutorais');
renderizarAdmin('admin-coqueteis', 'drinksCoqueteis');
