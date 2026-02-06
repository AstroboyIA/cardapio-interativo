const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const senha = document.getElementById('senha').value;

    if (senha === '1234') {
        sessionStorage.setItem('adminLogado', 'true');
        window.location.href = 'painel.html';
    } else {
        alert('Senha incorreta');
    }
});