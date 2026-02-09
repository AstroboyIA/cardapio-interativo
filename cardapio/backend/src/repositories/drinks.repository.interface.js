export default class DrinksRepository {

    listarAtivos() {
        // Deve retornar apenas drinks ativos
        throw new Error("Método listarAtivos não implementado.");
    }

    listarTodos() {
        // Deve retornar todos os drinks
        throw new Error("Método listarTodos não implementado.");
    }

    //@param { string } categoria

    listarPorCategoria(categoria) {
        // Deve retornar lista por categoria
        throw new Error("Método listarPorCategoria não implementado.");
    }

    //@param { string } id

    buscarPorId(id) {
        // Deve buscar por ID
        throw new Error("Método buscarPorId não implementado.");
    }

    //@param { object } dados

    criar(categoria, dados) {
        // Deve criar um drink
        throw new Error("Método criar não implementado.");
    }

    //@param { string } id
    //@param { object } dados

    atualizar(id, dados) {
        // Deve atualizar um drink
        throw new Error("Método atualizar não implementado.");
    }

    //@param { string } id

    ativar(id) {
        // Deve ativar um drink
        throw new Error("Método ativar não implementado.");
    }


    //@param { string } id

    desativar(id) {
        // Deve desativar um drink
        throw new Error("Método desativar não implementado.");
    }

    //@param { string } id

    remover(id) {
        // Deve remover um drink
        throw new Error("Método remover não implementado.");
    }
}
