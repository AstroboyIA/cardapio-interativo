if (!sessionStorage.getItem('adminLogado')) {
    window.location.href = 'index.html';
}

document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('adminLogado');
    window.location.href = 'index.html';
});

function renderizarAdmin(idContainer, chaveStorage) {
    const container = document.getElementById(idContainer);
    if (!container) return;

    container.innerHTML = '';

    const drinks = carregarDrinks(chaveStorage);
    drinks.forEach((drink, index) => {
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
        checkbox.addEventListener('change', () => {
            drinks[index].ativo = checkbox.checked;
            salvarDrinks(chaveStorage, drinks);
            renderizarCardapioPublico();
        });
        container.appendChild(linha);
    });
}

renderizarAdmin('admin-classicos', 'drinksClassicos');
renderizarAdmin('admin-autorais', 'drinksAutorais');
renderizarAdmin('admin-sem-alcool', 'drinksSemAlcool');
//renderizarAdmin('admin-doces', 'drinksDocesETropicais');
//renderizarAdmin('admin-premium', 'drinksPremium');