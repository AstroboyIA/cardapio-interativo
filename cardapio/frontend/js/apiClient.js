// Base da API (Local) para testes
//const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = 'https://cardapio-api-abmk.onrender.com/api';

async function parseErrorResponse(response, fallbackMessage) {
    let details = '';

    try {
        const data = await response.json();
        details = data?.error || data?.erro || '';
    } catch {
        details = await response.text();
    }

    const suffix = details ? `: ${details}` : '';
    return new Error(`${fallbackMessage} (HTTP ${response.status})${suffix}`);
}

export const ApiClient = {

    async login(senha) {
        // Faz login e salva o token no sessionStorage
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha })
        });

        if (!response.ok) {
            throw await parseErrorResponse(response, 'Falha na autenticação');
        }

        const data = await response.json();
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
        }
        return data;
    },

    async getDrinks(categoria) {
        // Busca drinks por categoria
        const response = await fetch(`${API_BASE_URL}/drinks/categoria/${encodeURIComponent(categoria)}`);
        if (!response.ok) {
            throw await parseErrorResponse(response, 'Erro ao buscar drinks');
        }
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

        if (!response.ok) {
            throw await parseErrorResponse(response, 'Erro ao atualizar drink');
        }
        
        localStorage.setItem('drinksUpdatedAt', Date.now().toString());
    }
};
