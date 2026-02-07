import authRoutes from './routes/auth.routes.js';
import drinksRoutes from './routes/drinks.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/drinks', drinksRoutes);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../')));

const DATA_PATH = path.join(__dirname, 'data', 'drinks.json');

function lerDados() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function salvarDados(dados) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(dados, null, 2));
}

app.get('/api/drinks/:categoria', (req, res) => {
    const dados = lerDados();
    res.json(dados[req.params.categoria] || []);
});

app.put('/api/drinks/:categoria/:index', (req, res) => {
    const dados = lerDados();
    const { categoria, index } = req.params;

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

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});