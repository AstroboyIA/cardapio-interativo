export default class DrinksService {

    constructor(drinksRepository) {
        // Recebe o repositorio (JSON ou Postgres)
        this.drinksRepository = drinksRepository;
    }

    listarAtivos() {
        // Lista apenas drinks ativos
        return this.drinksRepository.listarAtivos();
    }

    listarTodos() {
        // Lista todos os drinks (admin)
        return this.drinksRepository.listarTodos();
    }

    listarPorCategoria(categoria) {
        if (!categoria) {
            throw new Error("Categoria é obrigatória");
        }

        // Encaminha para o repositorio
        return this.drinksRepository.listarPorCategoria(categoria);
    }

    criar(dados) {

        const { categoria, nome, descricao, ingredientes, imagem } = dados;

        if (!categoria || !nome || !descricao || !ingredientes)
            throw new Error("Categoria, nome, descrição e ingredientes são obrigatórios.");

        // Cria um novo drink com status ativo
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

        // Atualiza campos informados
        return this.drinksRepository.atualizar(id, dados);
    }

    ativar(id) {
        if (!id) throw new Error('ID inválido.');
        // Ativa o drink
        return this.drinksRepository.ativar(id);
    }

    desativar(id) {
        if (!id) throw new Error('ID inválido.');
        // Desativa o drink
        return this.drinksRepository.desativar(id);
    }

    remover(id) {
        if (!id) {
            throw new Error("ID inválido.");
        }

        // Remove o drink
        return this.drinksRepository.remover(id);
    }
}
