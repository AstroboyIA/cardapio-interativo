const API_BASE_URL = 'https://cardapio-api-abmk.onrender.com/api';
//const API_BASE_URL = 'http://localhost:3000/api';

export const ApiClient = {

    async login(senha) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha })
        });

        if (!response.ok) throw new Error('Falha na autenticação');

        const data = await response.json();
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
        }
        return data;
    },

    async getDrinks(categoria) {
        const response = await fetch(`${API_BASE_URL}/drinks/${categoria}`);
        if (!response.ok) throw new Error('Erro ao buscar drinks');
        return response.json();
    },

    async atualizarDrink(categoria, index, dadosAtualizados) {
        const token = sessionStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/drinks/${categoria}/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) throw new Error('Erro ao atualizar drink');
        
        localStorage.setItem('drinksUpdatedAt', Date.now().toString());
    }
};