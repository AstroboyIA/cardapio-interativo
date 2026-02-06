function renderizarDrinks(idContainer, chaveStorage) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    container.innerHTML = '';

    const drinks = carregarDrinks(chaveStorage);

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
    })
}


const categorias = document.querySelectorAll('.categoria');

categorias.forEach(categoria => {
    const titulo = categoria.querySelector('.categoria-titulo');

    titulo.addEventListener('click', () => {
        categoria.classList.toggle('ativa');
    });
});

const drinksClassicos = [

    {
        nome: "🍸 Mojito",
        descricao: "Refrescante e equilibrado, perfeito para eventos ao ar livre.",
        ingredientes: " Rum, hortelã, limão, açúcar, água com gás.",
        ativo: true
    },

    {
        nome: "🍹 Caipirinha",
        descricao: "O clássico brasileiro que não pode faltar.",
        ingredientes: "Cachaça, limão, açúcar.",
        ativo: true
    },

    {
        nome: "🍊 Negroni",
        descricao: "Intenso e sofisticado, ideal para quem aprecia sabores marcantes.",
        ingredientes: "Gin, vermute rosso, Campari.",
        ativo: true
    },

    {
        nome: "🍋 Margarita",
        descricao: "Cítrica e vibrante, com final seco e elegante.",
        ingredientes: "Tequila, licor de laranja, limão.",
        ativo: true
    }

]

if (!localStorage.getItem("drinksClassicos")) {
    salvarDrinks("drinksClassicos", drinksClassicos);
}

const drinksAutorais = [
    {
        nome: '✨ Aurora Tropical',
        descricao: 'Um drink autoral com equilíbrio entre doçura e frescor.',
        ingredientes: 'Vodka, abacaxi, hortelã, xarope artesanal, limão.',
        ativo: true
    },

    {
        nome: '🌙 Noite de Âmbar',
        descricao: 'Aromático e envolvente, criado para momentos especiais.',
        ingredientes: 'Gin, especiarias, laranja, mel.',
        ativo: true
    },

    {
        nome: '🌿 Jardim Secreto',
        descricao: 'Leve, herbal e surpeendente do primeiro ao último gole.',
        ingredientes: ' Gin, pepino, manjericão, limão siciliano.',
        ativo: true
    },

    {
        nome: '🔥 Brisa Defumada',
        descricao: 'Um drink intenso com toque defumado e final elegante.',
        ingredientes: 'Whisky, açúcar mascavo, bitter aromático, laranja.',
        ativo: true

    }
]

if (!localStorage.getItem("drinksAutorais")) {
    salvarDrinks("drinksAutorais", drinksAutorais);
}

const drinksSemAlcool = [
    {
        nome: '🍓 Refresco de Frutas Vermelhas',
        descricao: 'Doce na medida certa e extermamente refrescante.',
        ingredientes: 'Frutas vermelhas, limão, açucar, água com gás.',
        ativo: true
    },

    {
        nome: '🍍 Tropical Fresh',
        descricao: 'Leve e tropical, perfeito para todos os públicos.',
        ingredientes: 'Abacaxi, coco, hortelã.',
        ativo: true
    },

    {
        nome: '🍋 Citrus Splash',
        descricao: 'Refrescância cítrica com equilíbrio e leveza.',
        ingredientes: 'Limão, laranja, açucar, água com gás.',
        ativo: true
    },

    {
        nome: '🍏 Green Life',
        descricao: 'Natural, fresco e cheio de sabor.',
        ingredientes: 'Maçã verde, hortelã, limão.',
        ativo: true
    }
]

if (!localStorage.getItem("drinksSemAlcool")) {
    salvarDrinks("drinksSemAlcool", drinksSemAlcool);
}

const drinksDocesETropicais = [
    {
        nome: '🥥 Piña Colada',
        descricao: 'Refrescante e leve, para todos os públicos.',
        ingredientes: 'Limão, açúcar, hortelã, água com gás.',
        ativo: true
    },

    {
        nome: '🍑 Sex on the Beach',
        descricao: 'Doce, frutado e descontraído.',
        ingredientes: 'Vodka, pêssego, laranja, cranberry.',
        ativo: true
    },

    {
        nome: '🍓 Strawberry Dream',
        descricao: 'Suave e adocicado, perfeito para quem ama frutas.',
        ingredientes: 'Vodka, morango, creme de leite.',
        ativo: true
    },

    {
        nome: '🍌 Banana Sunset',
        descricao: 'Tropical e aveludado, com toque exótico.',
        ingredientes: 'Rum, banana, leite condensado.',
        ativo: true

    }
]

if (!localStorage.getItem("drinksDocesETropicais")) {
    salvarDrinks("drinksDocesETropicais", drinksDocesETropicais);
}

const drinksPremium = [
    {
        nome: '🖤 Gin Tônica Premium',
        descricao: 'Clássico elevado ao máximo nível de sofisticação.',
        ingredientes: 'Gin premium, tônica artesanal, especiarias.',
        ativo: true
    },

    {
        nome: '🔥 Old Fashioned',
        descricao: 'Elegante, intenso e atemporal.',
        ingredientes: 'Whisky, açúcar. bitter, laranja.',
        ativo: true
    },

    {
        nome: '💎 Martini Dry',
        descricao: 'Seco, refinado e extremamente clássico.',
        ingredientes: 'Gin, vermute seco, azeitona.',
        ativo: true
    },

    {
        nome: '🌫️ Smoke Experience',
        descricao: 'Uma experiência sensorial com aroma e sabor marcantes.',
        ingredientes: 'Whisky, defumação aromática, especiarias.',
        ativo: false
    }
]

if (!localStorage.getItem("drinksPremium")) {
    salvarDrinks("drinksPremium", drinksPremium);
}

function salvarDrinks(chave, drinks) {
    localStorage.setItem(chave, JSON.stringify(drinks));
}

renderizarDrinks('classicos', 'drinksClassicos');
renderizarDrinks('autorais', 'drinksAutorais');
renderizarDrinks('sem-alcool', 'drinksSemAlcool');
renderizarDrinks('doces-e-tropicais', 'drinksDocesETropicais');
renderizarDrinks('premium', 'drinksPremium');

function carregarDrinks(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

function renderizarAdmin(idContainer, chaveStorage) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    console.log('Tentando renderizar:', idContainer, container);

    container.innerHTML = '';

    const drinks = carregarDrinks(chaveStorage);

    drinks.forEach((drink, index) => {
        const linha = document.createElement('div');
        linha.classList.add('admin-drink');

        linha.innerHTML = `
            <span>${drink.nome}</span>
            <label class="switch">
                <input type="checkbox" ${drink.ativo ? 'checked' : ''}>
                <span class='slider'></span>
            </label>
        `;

        const checkbox = linha.querySelector('input[type="checkbox"]');

        checkbox.addEventListener('change', () => {
            drinks[index].ativo = checkbox.checked;
            salvarDrinks(chaveStorage, drinks);

            renderizarCardapioPublico();
        });

        container.appendChild(linha);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarAdmin('admin-classicos', 'drinksClassicos');
    renderizarAdmin('admin-autorais', 'drinksAutorais');
    renderizarAdmin('admin-sem-alcool', 'drinksSemAlcool');
    renderizarAdmin('admin-doces', 'drinksDocesETropicais');
    renderizarAdmin('admin-premium', 'drinksPremium');
});

window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith('drinks')) {
        renderizarCardapioPublico();
    }
});

function renderizarCardapioPublico() {
    renderizarDrinks('classicos', 'drinksClassicos');
    renderizarDrinks('autorais', 'drinksAutorais');
    renderizarDrinks('sem-alcool', 'drinksSemAlcool');
    renderizarDrinks('doces-e-tropicais', 'drinksDocesETropicais');
    renderizarDrinks('premium', 'drinksPremium');
}
