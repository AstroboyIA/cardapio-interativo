// Base da API (Render)
const API_BASE_URL = 'https://cardapio-api-abmk.onrender.com/api';
//const API_BASE_URL = 'http://localhost:3000/api';

export const ApiClient = {

    async login(senha) {
        // Faz login e salva o token no sessionStorage
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
        // Busca drinks por categoria
        const response = await fetch(`${API_BASE_URL}/drinks/categoria/${categoria}`);
        if (!response.ok) throw new Error('Erro ao buscar drinks');
        return response.json();
    },

    async atualizarDrink(id, dadosAtualizados) {
        // Atualiza status do drink (admin)
        const token = sessionStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/drinks/${id}/status`, {
            method: 'PATCH',
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
