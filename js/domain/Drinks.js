export class Drink {
    constructor(nome, descricao, ingredientes, ativo = true) {
        this.nome = nome;
        this.descricao = descricao;
        this.ingredientes = ingredientes;
        this.ativo = ativo;
    }

    ativar() {
        this.ativo = true;
    }

    desativar() {
        this.ativo = false;
    }

    estaAtivo() {
        return this.ativo;
    }
}