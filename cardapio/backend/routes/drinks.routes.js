import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// caminho correto para o JSON
const DATA_PATH = path.resolve(__dirname, '../data/drinks.json');

function lerDados() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

// GET público
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