import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { autenticarToken } from '../middlewares/authMiddleware.js';
import { apenasAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, '../data/drinks.json');

function lerDados() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

router.get('/:categoria', (req, res) => {
    try {
        const dados = lerDados();
        const categoria = req.params.categoria;

        res.json(dados[categoria] || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao ler drinks' });
    }
});

export default router;

router.put('/:categoria', autenticarToken, apenasAdmin, (req, res) => {
    try {
        const dados = lerDados();
        const categoria = req.params.categoria;

        dados[categoria] = novosDados;

        fs.writeFileSync(DATA_PATH, JSON.stringify(dados, null, 2));

        res.json({ mensagem: 'Categoria atualizada com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar drinks' });
    }
}
);