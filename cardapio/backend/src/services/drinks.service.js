export default class DrinksService {

    constructor(drinksRepository) {
        this.drinksRepository = drinksRepository;
    }

    listarAtivos() {
        return this.drinksRepository.listarAtivos();
    }

    listarTodos() {
        return this.drinksRepository.listarTodos();
    }

    listarPorCategoria(categoria) {
        if (!categoria) {
            throw new Error("Categoria é obrigatória");
        }

        return this.drinksRepository.listarPorCategoria(categoria);
    }

    criar(dados) {

        const { categoria, nome, descricao, ingredientes, imagem } = dados;

        if (!categoria || !nome || !descricao || !ingredientes)
            throw new Error("Categoria, nome, descrição e ingredientes são obrigatórios.");

        return this.drinksRepository.criar(categoria, {
            nome,
            descricao,
            ingredientes,
            imagem: imagem || '',
            ativo: true,
        });
    }

    atualizar(id, dados) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        return this.drinksRepository.atualizar(id, dados);
    }

    ativar(id) {
        if (!id) throw new Error('ID inválido.');
        return this.drinksRepository.ativar(id);
    }

    desativar(id) {
        if (!id) throw new Error('ID inválido.');
        return this.drinksRepository.desativar(id);
    }

    remover(id) {
        if (!id) {
            throw new Error("ID inválido.");
        }

        return this.drinksRepository.remover(id);
    }
}
