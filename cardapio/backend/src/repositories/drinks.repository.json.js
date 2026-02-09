import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import DrinksRepository from './drinks.repository.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../data/drinks.json');

export default class DrinksRepositoryJson extends DrinksRepository {
    #read() {
        const raw = fs.readFileSync(DATA_PATH, 'utf-8');
        return JSON.parse(raw);
    }

    #write(data) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }

    listarTodos() {
        const data = this.#read();
        return Object.values(data).flat();
    }

    listarAtivos() {
        return this.listarTodos().filter(d => d.ativo);
    }

    listarPorCategoria(categoria) {
        const data = this.#read();
        return data[categoria] || [];
    }

    buscarPorId(id) {
        return this.listarTodos().find(d => d.id === id) || null;
    }

    criar(categoria, dados) {
        const data = this.#read();

        if (!data[categoria]) {
            data[categoria] = [];
        }

        const novoDrink = {
            id: crypto.randomUUID(),
            ...dados,
        };

        data[categoria].push(novoDrink);
        this.#write(data);

        return novoDrink;
    }

    atualizar(id, dados) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => d.id === id);

            if (index !== -1) {
                data[categoria][index] = {
                    ...data[categoria][index],
                    ...dados,
                };

                this.#write(data);
                return data[categoria][index];
            }
        }

        throw new Error('Drink não encontrado');
    }

    remover(id) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => d.id === id);

            if (index !== -1) {
                const [removido] = data[categoria].splice(index, 1);
                this.#write(data);
                return removido;
            }
        }

        throw new Error('Drink não encontrado');
    }

    ativar(id) {
        return this.#updateStatus(id, true);
    }

    desativar(id) {
        return this.#updateStatus(id, false);
    }

    #updateStatus(id, ativo) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => d.id === id);

            if (index !== -1) {
                data[categoria][index].ativo = ativo;
                this.#write(data);
                return data[categoria][index];
            }
        }

        throw new Error('Drink não encontrado');
    }
}
