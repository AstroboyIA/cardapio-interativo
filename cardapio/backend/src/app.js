import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import drinksRoutes from './routes/drinks.routes.js';

//express.static    precisa sair daqui depois
import path from 'path';
import { fileURLToPath } from 'url';

export default function createApp({ drinksController }) {
    const app = express();

    //express.static
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Habilita CORS e JSON no corpo das requests
    app.use(cors());
    app.use(express.json());

    // Rotas da API
    app.use('/api/auth', authRoutes);
    app.use('/api/drinks', drinksRoutes(drinksController));

    //express.static
    app.use(express.static(path.join(__dirname, '../../frontend')));

    // Rota principal para servir o front
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/index.html'));
    });

    return app;
}
