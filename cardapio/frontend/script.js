import { ApiClient } from './js/apiClient.js';

function normalizarCaminhoImagem(caminho) {
    if (!caminho) return '';

    // Correção de erro vindo do db ".ipeg" -> ".jpeg"
    return caminho.replace(/\.ipeg$/i, '.jpeg');
}

function alternarExtensaoJpegJpg(url) {
    if (!url) return url;
    if (/\.jpeg$/i.test(url)) return url.replace(/\.jpeg$/i, '.jpg');
    if (/\.jpg$/i.test(url)) return url.replace(/\.jpg$/i, '.jpeg');
    return url;
}

function renderizarDrinks(idContainer, chaveStorage, silencioso = false) {
    // Renderiza os drinks de uma categoria no cardapio publico
    const container = document.getElementById(idContainer);
    if (!container) return;

    if (!silencioso) {
        container.innerHTML = 'Carregando...';
    }

    ApiClient.getDrinks(chaveStorage)
        .then(drinks => {
            container.innerHTML = '';

            // Cria os cards
            drinks.forEach(drink => {
                if (!drink.ativo) return;
                const imagem = normalizarCaminhoImagem(drink.imagem);

                const card = document.createElement('div');
                card.classList.add('drink-card');

                card.innerHTML = `
                    <div class="drink-foto">
                        ${imagem ? `<img src="${imagem}" alt="${drink.nome}" loading="lazy" decoding="async">` : ''}
                    </div>
                    <div class="drink-info">
                        <h3>${drink.nome}</h3>
                        <p class="descricao">${drink.descricao}</p>
                        <p class="ingredientes"><strong>Ingredientes:</strong> ${drink.ingredientes}</p>
                    </div>
                `;

                const img = card.querySelector('img');
                if (img) {
                    img.addEventListener('error', () => {
                        if (!img.dataset.fallbackApplied) {
                            img.dataset.fallbackApplied = '1';
                            const fallback = alternarExtensaoJpegJpg(img.getAttribute('src'));
                            if (fallback && fallback !== img.getAttribute('src')) {
                                img.setAttribute('src', fallback);
                                return;
                            }
                        }

                        img.remove();
                    });
                }

                container.appendChild(card);
            });
        })
        .catch((error) => {
            console.error(`[cardapio] Falha ao carregar ${chaveStorage}:`, error.message);

            if (!silencioso) {
                container.innerHTML = 'Nao foi possivel carregar os drinks agora.';
            }
        });
}


const categorias = document.querySelectorAll('.categoria');

categorias.forEach(categoria => {
    const titulo = categoria.querySelector('.categoria-titulo');

    // Abre e fecha cada categoria ao clicar no titulo
    titulo.addEventListener('click', () => {
        categoria.classList.toggle('ativa');
    });
});

const CHAVE_CLASSICOS = 'drinks-classicos';
const CHAVE_AUTORAIS = 'drinks-autorais';
const CHAVE_COQUETEIS = 'drinks-coqueteis';

renderizarDrinks('classicos', 'drinks-classicos');
renderizarDrinks('autorais', 'drinks-autorais');
renderizarDrinks('coqueteis', 'drinks-coqueteis');

window.addEventListener('storage', (event) => {
    // Sincroniza com outras abas abertas
    if (event.key && event.key.startsWith('drinks')) {
        renderizarCardapioPublico();
    }
});

function renderizarCardapioPublico(silencioso = false) {
    
    renderizarDrinks('classicos', 'drinks-classicos', silencioso);
    renderizarDrinks('autorais', 'drinks-autorais', silencioso);
    renderizarDrinks('coqueteis', 'drinks-coqueteis', silencioso);
}

setInterval(() => {
    // Atualiza o cardapio a cada 5s
    renderizarCardapioPublico(true);
}, 5000);
