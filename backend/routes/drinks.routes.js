import express from 'express';
import fs from 'fs';
import path from 'path';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const DATA_PATH = path.join(__dirname, '...', 'data', 'drinks.json');

function lerDados() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function salvarDados(dados) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(dados, null, 2));
}

router.get('/:categoria', (req, res) => {
    const { categoria } = req.params;
    const dados = lerDados();

    if (!dados[categoria]) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(dados[categoria]);
});

router.put('/:categoria/:index', autenticarToken, (req, res) => {
    const { categoria, index } = req.params;
    const dados = lerDados();

    if (!dados[categoria] || !dados[categoria][index]) {
        return res.status(404).json({ error: 'Drink não encontrado' });
    }

    dados[categoria][index] = {
        ...dados[categoria][index],
        ...req.body
    };

    salvarDados(dados);

    res.json({ success: true });
});

export default router;