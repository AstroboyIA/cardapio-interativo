export default class DrinksController {
    constructor(drinksService) {
        // Injeta o service para usar a regra de negocio
        this.drinksService = drinksService;
    }

    listarAtivos = async (req, res) => {
        try {
            // Busca somente drinks ativos
            const drinks = await this.drinksService.listarAtivos();
            return res.json(drinks);
        } catch (error) {
            const message = error?.message || String(error);
            return res.status(500).json({ error: message });
        }
    };

    listarTodos = async (req, res) => {
        try {
            // Busca todos os drinks (admin)
            const drinks = await this.drinksService.listarTodos();
            return res.json(drinks);
        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] listarTodos error:', message);
            return res.status(500).json({ error: message });
        }
    };

    listarPorCategoria = async (req, res) => {
        try {
            const { categoria } = req.params;
            // Filtra pela categoria informada na rota
            const drinks = await this.drinksService.listarPorCategoria(categoria);
            return res.json(drinks);
        } catch (error) {
            const message = error?.message || String(error);
            return res.status(400).json({ error: message });
        }
    };

    criar = async (req, res) => {
        try {
            // Cria um novo drink
            const drink = await this.drinksService.criar(req.body);
            return res.status(201).json(drink);

        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] criar error:', message);
            return res.status(400).json({ error: message });
        }
    };

    atualizar = async (req, res) => {
        try {
            // Atualiza qualquer campo enviado
            const drink = await this.drinksService.atualizar(
                req.params.id,
                req.body
            );
            return res.json(drink);
        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] atualizar error:', message);
            return res.status(400).json({ error: message });
        }
    };

    atualizarStatus = async (req, res) => {
        try {
            const { ativo } = req.body;

            // Garante que o campo ativo seja boolean
            if (typeof ativo !== 'boolean') {
                return res.status(400).json({ error: 'Campo ativo deve ser boolean' });
            }

            // Atualiza status usando o service
            const drink = ativo
                ? await this.drinksService.ativar(req.params.id)
                : await this.drinksService.desativar(req.params.id);

            return res.json(drink);
        } catch (error) {
            const message = error?.message || String(error);
            return res.status(404).json({ error: message });
        }
    };


    ativar = async (req, res) => {
        try {
            // Ativa um drink pelo ID
            await this.drinksService.ativar(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] ativar error:', message);
            return res.status(404).json({ error: message });
        }
    };

    desativar = async (req, res) => {
        try {
            // Desativa um drink pelo ID
            await this.drinksService.desativar(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] desativar error:', message);
            return res.status(404).json({ error: message });
        }
    }

    remover = async (req, res) => {
        try {
            // Remove um drink pelo ID
            await this.drinksService.remover(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            const message = error?.message || String(error);
            console.error('[drinks] remover error:', message);
            return res.status(404).json({ error: message });
        }
    };
}
