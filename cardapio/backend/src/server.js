import dotenv from 'dotenv';
import createApp from './app.js';
import { makeDrinksRepository } from './repositories/index.js';
import DrinksService from './services/drinks.service.js';
import DrinksController from './controllers/drinks.controller.js';

dotenv.config();

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// Monta as dependencias em cadeia (Repository -> Service -> Controller)
const drinksRepository = makeDrinksRepository();
const drinksService = new DrinksService(drinksRepository);
const drinksController = new DrinksController(drinksService);

// Cria a aplicacao Express
const app = createApp({ drinksController });

// Garante que variaveis criticas existam antes de subir o servidor
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

// Preparar selecao de repositorio via variavel unica
/*
// Usar uma variavel clara para selecionar o repositorio.
// Exemplo: DB_DRIVER=postgres para ligar o Postgres.
const drinksRepository = makeDrinksRepository();
*/
