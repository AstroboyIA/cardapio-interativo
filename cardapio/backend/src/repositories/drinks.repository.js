import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, '../data/drinks.json');

function readData() {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

class DrinksRepository {

    findAll() {
        const data = readData();
        return Object.values(data).flat();
    }

    findAllAtivos() {
        return this.findAll().filter(drink => drink.ativo === true);
    }

    findById(id) {
        const data = readData();

        for (const categoria of Object.values(data)) {
            const drink = categoria.find(d => d.id === id)
            if (drink) return drink;
        }
        return null;
    }

    create(categoria, drink) {
        const data = readData();

        if (!data[categoria]) {
            throw new Error('Categoria inválida.');
        }

        const novoDrink = {
            id: randomUUID(),
            ...drink,
        };

        data[categoria].push(novoDrink);
        writeFile(data);

        return novoDrink;
    }

    updateStatus(id, ativo) {

        const data = readData();

        for (const categoria of Object.values(data)) {
            const index = categoria.findIndex(d => d.id === id);

            if (index !== -1) {
                categoria[index].ativo = ativo;
                writeData(data);
                return categoria[index];
            }
        }

        throw new Error('Drink não encontrado.');

    }
}

export default new DrinksRepository();