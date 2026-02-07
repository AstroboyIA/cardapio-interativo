import { Drink } from '../domain/Drink.js';
import { DrinkStorage } from '../storage/DrinkStorage.js';

export class DrinkService {

    static listar(chave) {
        return DrinkStorage.carregar(chave);
    }

    static alternarStatus(chave, index) {
        const drinks = DrinkStorage.carregar(chave);
        const drink = drinks[index];

        if (drink.ativo) {
            drink.ativo = false;
        } else {
            drink.ativo = true;
        }

        DrinkStorage.salvar(chave, drinks);
    }
}