const categorias = document.querySelectorAll('.categoria');

categorias.forEach(categoria => {
    const titulo = categoria.querySelector('.categoria-titulo');

    titulo.addEventListener('click', () => {
        categoria.classList.toggle('ativa');
    });
});