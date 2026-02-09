export default class DrinksController {
    constructor(drinksService) {
        this.drinksService = drinksService;
    }

    listarAtivos = async (req, res) => {
        try {
            const drinks = await this.drinksService.listarAtivos();
            return res.json(drinks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    listarTodos = async (req, res) => {
        try {
            const drinks = await this.drinksService.listarTodos();
            return res.json(drinks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    listarPorCategoria = async (req, res) => {
        try {
            const { categoria } = req.params;
            const drinks = await this.drinksService.listarPorCategoria(categoria);
            return res.json(drinks);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    criar = async (req, res) => {
        try {
            const drink = await this.drinksService.criar(req.body);
            return res.status(201).json(drink);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    atualizar = async (req, res) => {
        try {
            const drink = await this.drinksService.atualizar(
                req.params.id,
                req.body
            );
            return res.json(drink);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    atualizarStatus = async (req, res) => {
        try {
            const { ativo } = req.body;

            if (typeof ativo !== 'boolean') {
                return res.status(400).json({ error: 'Campo ativo deve ser boolean' });
            }

            const drink = ativo
                ? await this.drinksService.ativar(req.params.id)
                : await this.drinksService.desativar(req.params.id);

            return res.json(drink);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    };


    ativar = async (req, res) => {
        try {
            await this.drinksService.ativar(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    };

    desativar = async (req, res) => {
        try {
            await this.drinksService.desativar(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    remover = async (req, res) => {
        try {
            await this.drinksService.remover(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    };
}