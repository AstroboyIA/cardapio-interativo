import { Router } from 'express';
import { autenticarToken } from '../middlewares/auth.middleware.js';


export default function drinksRoutes(drinksController) {

    const router = Router();

    router.get('/', drinksController.listarAtivos.bind(drinksController));

    router.get(
        '/categoria/:categoria',
        drinksController.listarPorCategoria.bind(drinksController)
    )

    router.get(
        '/admin',
        autenticarToken,
        drinksController.listarTodos.bind(drinksController)
    );

    router.post('/',
        autenticarToken,
        drinksController.criar.bind(drinksController)
    );

    router.patch('/:id',
        autenticarToken,
        drinksController.atualizar.bind(drinksController)
    );

    router.patch('/:id/status',
        autenticarToken,
        drinksController.atualizarStatus.bind(drinksController)
    );

    router.patch('/:id/ativar',
        autenticarToken,
        drinksController.ativar.bind(drinksController)
    );

    router.patch('/:id/desativar',
        autenticarToken,
        drinksController.desativar.bind(drinksController)
    );

    router.delete('/:id',
        autenticarToken,
        drinksController.remover.bind(drinksController)
    );

    return router;
}
