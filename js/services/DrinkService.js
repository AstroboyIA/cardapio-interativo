import { ApiClient } from '../apiClient.js';

export class DrinkService {

    static async listar(chave) {
        return await ApiClient.getDrinks(chave);
    }

    static async alternarStatus(chave, index) {
        const drinks = await ApiClient.getDrinks(chave);
        if (drinks[index]) {
            const novoStatus = !drinks[index].ativo;
            await ApiClient.atualizarDrink(chave, index, { ativo: novoStatus });
        }
    }
}