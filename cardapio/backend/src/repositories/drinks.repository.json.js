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
        // Le o arquivo JSON completo
        const raw = fs.readFileSync(DATA_PATH, 'utf-8');
        return JSON.parse(raw);
    }

    #write(data) {
        // Escreve o arquivo JSON completo
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }

    listarTodos() {
        // Junta todas as categorias em um unico array
        const data = this.#read();
        return Object.values(data).flat();
    }

    listarAtivos() {
        // Filtra apenas ativos
        return this.listarTodos().filter(d => d.ativo);
    }

    listarPorCategoria(categoria) {
        // Retorna a lista de uma categoria especifica
        const data = this.#read();
        return data[categoria] || [];
    }

    buscarPorId(id) {
        // Procura por ID em todas as categorias
        return this.listarTodos().find(d => String(d.id) === String(id)) || null;
    }

    criar(categoria, dados) {
        const data = this.#read();

        // Garante que a categoria existe no JSON
        if (!data[categoria]) {
            data[categoria] = [];
        }

        // Cria um novo objeto com ID unico
        const novoDrink = {
            id: crypto.randomUUID(),
            ...dados,
        };

        // Salva no JSON
        data[categoria].push(novoDrink);
        this.#write(data);

        return novoDrink;
    }

    atualizar(id, dados) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => String(d.id) === String(id));

            if (index !== -1) {
                // Mescla dados antigos com os novos
                data[categoria][index] = {
                    ...data[categoria][index],
                    ...dados,
                };

                // Salva a alteracao no JSON
                this.#write(data);
                return data[categoria][index];
            }
        }

        throw new Error('Drink não encontrado');
    }

    remover(id) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => String(d.id) === String(id));

            if (index !== -1) {
                // Remove e salva no JSON
                const [removido] = data[categoria].splice(index, 1);
                this.#write(data);
                return removido;
            }
        }

        throw new Error('Drink não encontrado');
    }

    ativar(id) {
        // Ativa (true)
        return this.#updateStatus(id, true);
    }

    desativar(id) {
        // Desativa (false)
        return this.#updateStatus(id, false);
    }

    #updateStatus(id, ativo) {
        const data = this.#read();

        for (const categoria of Object.keys(data)) {
            const index = data[categoria].findIndex(d => String(d.id) === String(id));

            if (index !== -1) {
                // Atualiza o status ativo
                data[categoria][index].ativo = ativo;
                this.#write(data);
                return data[categoria][index];
            }
        }

        throw new Error('Drink não encontrado');
    }
}
