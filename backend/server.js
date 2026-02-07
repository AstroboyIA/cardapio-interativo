import authRoutes from './routes/auth.routes.js';
import drinksRoutes from './routes/drinks.routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/drinks', drinksRoutes);

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});