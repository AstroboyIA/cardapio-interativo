import { Router } from 'express';
import { autenticarToken } from '../middlewares/auth.middleware.js';


export default function drinksRoutes(drinksController) {

    const router = Router();

    // Lista apenas os drinks ativos (publico)
    router.get('/', drinksController.listarAtivos.bind(drinksController));

    router.get(
        '/categoria/:categoria',
        // Lista por categoria (publico)
        drinksController.listarPorCategoria.bind(drinksController)
    )

    router.get(
        '/admin',
        // Lista tudo (admin)
        autenticarToken,
        drinksController.listarTodos.bind(drinksController)
    );

    router.post('/',
        // Cria drink (admin)
        autenticarToken,
        drinksController.criar.bind(drinksController)
    );

    router.patch('/:id',
        // Atualiza campos do drink (admin)
        autenticarToken,
        drinksController.atualizar.bind(drinksController)
    );

    router.patch('/:id/status',
        // Atualiza somente o status ativo (admin)
        autenticarToken,
        drinksController.atualizarStatus.bind(drinksController)
    );

    router.patch('/:id/ativar',
        // Ativa um drink (admin)
        autenticarToken,
        drinksController.ativar.bind(drinksController)
    );

    router.patch('/:id/desativar',
        // Desativa um drink (admin)
        autenticarToken,
        drinksController.desativar.bind(drinksController)
    );

    router.delete('/:id',
        // Remove um drink (admin)
        autenticarToken,
        drinksController.remover.bind(drinksController)
    );

    return router;
}
