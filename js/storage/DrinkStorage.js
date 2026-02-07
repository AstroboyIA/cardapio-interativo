export class DrinkStorage {

    static salvar(chave, drinks) {
        localStorage.setItem(chave, JSON.stringify(drinks));
    }

    static carregar(chave) {
        return JSON.parse(localStorage.getItem(chave)) || [];
    }
}