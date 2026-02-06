if (!sessionStorage.getItem('adminLogado')) {
    window.location.href = 'index.html';
}

sessionStorage.setItem('adminLogado', 'true');

const logado = sessionStorage.getItem('adminLogado');