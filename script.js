import { ApiClient } from './js/apiClient.js';

function renderizarDrinks(idContainer, chaveStorage) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    container.innerHTML = 'Carregando...';

    ApiClient.getDrinks(chaveStorage).then(drinks => {
        container.innerHTML = '';


        drinks.forEach(drink => {
            if (!drink.ativo) return;

            const card = document.createElement('div');
            card.classList.add('drink-card');

            card.innerHTML = `
                <h3>${drink.nome}</h3>
                <p>${drink.descricao}</p>
                <p><strong>Ingredientes:</strong> ${drink.ingredientes}</p>
            `;

            container.appendChild(card);
        });
    });
}


const categorias = document.querySelectorAll('.categoria');

categorias.forEach(categoria => {
    const titulo = categoria.querySelector('.categoria-titulo');

    titulo.addEventListener('click', () => {
        categoria.classList.toggle('ativa');
    });
});

const CHAVE_CLASSICOS = 'drinksClassicos';
const CHAVE_AUTORAIS = 'drinksAutorais';
const CHAVE_COQUETEIS = 'drinksCoqueteis';

renderizarDrinks('classicos', 'drinksClassicos');
renderizarDrinks('autorais', 'drinksAutorais');
renderizarDrinks('coqueteis', 'drinksCoqueteis');

window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith('drinks')) {
        renderizarCardapioPublico();
    }
});

function renderizarCardapioPublico() {
    renderizarDrinks('classicos', 'drinksClassicos');
    renderizarDrinks('autorais', 'drinksAutorais');
    renderizarDrinks('coqueteis', 'drinksCoqueteis');
}
