import dotenv from 'dotenv';
import createApp from './app.js';
import { makeDrinksRepository } from './repositories/index.js';
import DrinksService from './services/drinks.service.js';
import DrinksController from './controllers/drinks.controller.js';

dotenv.config();

const drinksRepository = makeDrinksRepository();
const drinksService = new DrinksService(drinksRepository);
const drinksController = new DrinksController(drinksService);

const app = createApp({ drinksController });

const requiredEnv = ['ADMIN_PASSWORD', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
    console.error(`Variáveis de ambiente ausentes: ${missingEnv.join(', ')}`);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});