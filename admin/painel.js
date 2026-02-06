if (!sessionStorage.getItem('adminLogado')) {
    window.location.href = 'index.html';
}

document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('adminLogado');
    window.location.href = 'index.html';
});