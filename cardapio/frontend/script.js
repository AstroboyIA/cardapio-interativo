import { ApiClient } from './js/apiClient.js';

function renderizarDrinks(idContainer, chaveStorage, silencioso = false) {
    // Renderiza os drinks de uma categoria no cardapio publico
    const container = document.getElementById(idContainer);
    if (!container) return;

    if (!silencioso) {
        container.innerHTML = 'Carregando...';
    }

    ApiClient.getDrinks(chaveStorage).then(drinks => {
        container.innerHTML = '';

        // Cria os cards
        drinks.forEach(drink => {
            if (!drink.ativo) return;

            const card = document.createElement('div');
            card.classList.add('drink-card');

            card.innerHTML = `
                <div class="drink-foto">
                    ${drink.imagem ? `<img src="${drink.imagem}" alt="${drink.nome}">` : ''}
                </div>
                <div class="drink-info">
                    <h3>${drink.nome}</h3>
                    <p class="descricao">${drink.descricao}</p>
                    <p class="ingredientes"><strong>Ingredientes:</strong> ${drink.ingredientes}</p>
                </div>
            `;

            container.appendChild(card);
        });
    });
}


const categorias = document.querySelectorAll('.categoria');

categorias.forEach(categoria => {
    const titulo = categoria.querySelector('.categoria-titulo');

    // Abre/fecha cada categoria ao clicar no titulo
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
    // Sincroniza com outras abas abertas
    if (event.key && event.key.startsWith('drinks')) {
        renderizarCardapioPublico();
    }
});

function renderizarCardapioPublico(silencioso = false) {
    // Recarrega todas as categorias
    renderizarDrinks('classicos', 'drinksClassicos', silencioso);
    renderizarDrinks('autorais', 'drinksAutorais', silencioso);
    renderizarDrinks('coqueteis', 'drinksCoqueteis', silencioso);
}

setInterval(() => {
    // Atualiza o cardapio a cada 5s
    renderizarCardapioPublico(true);
}, 5000);
