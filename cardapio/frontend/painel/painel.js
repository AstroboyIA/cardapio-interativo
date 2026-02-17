import { ApiClient } from '../js/apiClient.js';

// Redireciona se nao estiver logado
if (!sessionStorage.getItem('adminLogado')) {
    window.location.href = '../index.html';
}

document.getElementById('logout').addEventListener('click', () => {
    // Limpa sessao do admin
    sessionStorage.removeItem('adminLogado');
    window.location.href = '../index.html';
});

async function renderizarAdmin(idContainer, chaveStorage) { 
    // Renderiza os switches de ativar/desativar
    const container = document.getElementById(idContainer);
    if (!container) return;

    container.innerHTML = 'Carregando...';

    let drinks = [];
    try {
        // Busca drinks da categoria
        drinks = await ApiClient.getDrinks(chaveStorage);
    } catch (error) {
        console.error(`[painel] Falha ao carregar ${chaveStorage}:`, error.message);
        container.innerHTML = 'Nao foi possivel carregar os drinks.';
        return;
    }

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
            // Envia apenas o status atualizado
            try {
                await ApiClient.atualizarDrink(drink.id, {
                    ativo: checkbox.checked
                });
            } catch (error) {
                checkbox.checked = !checkbox.checked;
                console.error(`[painel] Falha ao atualizar ${drink.id}:`, error.message);
                alert('Nao foi possivel atualizar o status agora.');
            }
        });
        container.appendChild(linha);
    });
}

renderizarAdmin('admin-classicos', 'drinks-classicos');
renderizarAdmin('admin-autorais', 'drinks-autorais');
renderizarAdmin('admin-coqueteis', 'drinks-coqueteis');
