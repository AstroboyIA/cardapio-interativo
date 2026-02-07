import { Drink } from './domain/Drink.js';
import { DrinkStorage } from './storage/DrinkStorage.js';
import { DrinkService } from './services/DrinkService.js';

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

const CHAVE_CLASSICOS = 'drinksClassicos';

if (!localStorage.getItem(CHAVE_CLASSICOS)) {
    const drinksClassicos = [
        new Drink(
            '🍸 Mojito',
            'Refrescante e equilibrado, perfeito para eventos ao ar livre.',
            'Rum, hortelã, limão, açúcar, água com gás'
        ),
        new Drink(
            '🍹 Caipirinha',
            'O clássico brasileiro que não pode faltar.',
            'Cachaça, limão, açúcar'
        ),
        new Drink(
            '🍊 Negroni',
            'Intenso e sofisticado, ideal para quem aprecia sabores marcantes.',
            'Gin, vermute rosso, Campari'
        ),
        new Drink(
            '🍋 Margarita',
            'Cítrica e vibrante, com final seco e elegante.',
            'Tequila, licor de laranja, limão'
        )
    ];

    DrinkStorage.salvar(CHAVE_CLASSICOS, drinksClassicos);
}

function renderizarClassicos() {
    const container = document.getElementById('classicos');
    container.innerHTML = '';

    const drinks = DrinkService.listar(CHAVE_CLASSICOS);

    drinks.forEach(drink => {
        if (!drink.ativo) return;

        container.innerHTML += `
            <div class="drink-card">
                <h3>${drink.nome}</h3>
                <p>${drink.descricao}</p>
                <p><strong>Ingredientes:</strong> ${drink.ingredientes}</p>
            </div>
        `;
    });
}

renderizarClassicos();

const drinksAutorais = [
    {
        nome: '✨ Divino',
        descricao: 'Um drink autoral com equilíbrio entre doçura e frescor.',
        ingredientes: 'Rum (60ml),xarope de capim santo(30ml), abacaxi,  água com gás.',
        ativo: true
    },

    {
        nome: '🌙 Manguetown - (copo com gelo)',
        descricao: 'Aromático e envolvente, criado para momentos especiais.',
        ingredientes: 'Vodka (60ml), extrato de manga/fruta manga (60m), xarope simples (25ml), fermentado de gengibre.',
        ativo: true
    },

    {
        nome: '🌿 Ginger Ale',
        descricao: 'Leve, herbal e surpeendente do primeiro ao último gole.',
        ingredientes: ' Cachaça (60ml), xarope de gengibre, limão, xarope simples, água com gás, espuma de gengibre.',
        ativo: true
    },

    {
        nome: '🔥 Sunshine',
        descricao: 'Um drink intenso com toque defumado e final elegante.',
        ingredientes: 'Vodka (60ml), xarope de hubisco (15ml), xarope simples (20ml), morango, suco de laranja, espuma de limão',
        ativo: true

    },

    {
        nome: 'Flor',
        descricao: 'Descrição generica',
        ingredientes: 'Vodka (60ml), xarope de hibisco, abacaxi, espuma de morango',
        ativo: true
    },

    {
        nome: 'Limonada Suíça',
        descricao: 'Descrição generica',
        ingredientes: 'Vodka, leite condensado, limão, ágia com gás.',
        ativo: true
    },

    {
        nome: 'Azura',
        descricao: 'Descrição generica',
        ingredientes: 'Suco de laranja, limão azul, espuma de limão, água com gás.',
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

/*const drinksDocesETropicais = [
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
}*/

/*const drinksPremium = [
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
}*/

function salvarDrinks(chave, drinks) {
    localStorage.setItem(chave, JSON.stringify(drinks));
}

renderizarDrinks('classicos', 'drinksClassicos');
renderizarDrinks('autorais', 'drinksAutorais');
renderizarDrinks('sem-alcool', 'drinksSemAlcool');
//renderizarDrinks('doces-e-tropicais', 'drinksDocesETropicais');
//renderizarDrinks('premium', 'drinksPremium');

function carregarDrinks(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith('drinks')) {
        renderizarCardapioPublico();
    }
});

function renderizarCardapioPublico() {
    renderizarDrinks('classicos', 'drinksClassicos');
    renderizarDrinks('autorais', 'drinksAutorais');
    renderizarDrinks('sem-alcool', 'drinksSemAlcool');
    //renderizarDrinks('doces-e-tropicais', 'drinksDocesETropicais');
    //renderizarDrinks('premium', 'drinksPremium');
}
