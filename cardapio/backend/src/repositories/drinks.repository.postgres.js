import DrinksRepository from './drinks.repository.interface.js';
import db from '../database/db.js';

export default class DrinksRepositoryPostgres extends DrinksRepository {

    async listarTodos() {

        const { rows } = await db.query(`
            SELECT
                d.id,
                d.nome,
                d.descricao,
                d.ingredientes,
                d.imagem,
                d.ativo,
                c.slug AS categoria
            FROM drinks d
            JOIN categories c ON c.id = d.categoria_id
            ORDER BY d.created_at;
        `);
        return rows;
    }

    async listarAtivos() {
        
        const { rows } = await db.query(`
            SELECT
                d.id,
                d.nome,
                d.descricao,
                d.ingredientes,
                d.imagem,
                c.slug AS categoria,
                d.ativo
            FROM drinks d
            JOIN categories c ON c.id = d.categoria_id
            WHERE d.ativo = true
            ORDER BY d.created_at;
        `);
        return rows;
    }

    async listarPorCategoria(categoria) {
        // Filtra por categoria (slug)
        const { rows } = await db.query(`
            SELECT
                d.id,
                d.nome,
                d.descricao,
                d.ingredientes,
                d.imagem,
                d.ativo,
                c.slug AS categoria
            FROM drinks d
            JOIN categories c ON c.id = d.categoria_id
            WHERE c.slug = $1
            ORDER BY d.created_at;
        `, [categoria]);
        return rows;
    }

    async buscarPorId(id) {
        // Busca um drink por ID
        const { rows } = await db.query(`
            SELECT
                d.id,
                d.nome,
                d.descricao,
                d.ingredientes,
                d.imagem,
                d.ativo,
                c.slug AS categoria
            FROM drinks d
            JOIN categories c ON c.id = d.categoria_id
            WHERE d.id = $1
        `, [id]);
        return rows[0] || null;
    }

    async criar(categoria, dados) {
        const { nome, descricao, ingredientes, imagem, ativo } = dados;

        // Descobre o ID da categoria a partir do slug
        const categoryResult = await db.query(
            'SELECT id FROM categories WHERE slug = $1',
            [categoria]
        );

        if (categoryResult.rowCount === 0) {
            throw new Error("Categoria não encontrada.");
        }

        const categoryId = categoryResult.rows[0].id;

        // Insere e ja retorna o drink criado com o slug da categoria
        const { rows } = await db.query(`
            WITH inserted AS (
                INSERT INTO drinks
                (nome, descricao, ingredientes, imagem, ativo, categoria_id)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *
            )
            SELECT
                inserted.id,
                inserted.nome,
                inserted.descricao,
                inserted.ingredientes,
                inserted.imagem,
                inserted.ativo,
                c.slug AS categoria
            FROM inserted
            JOIN categories c ON c.id = inserted.categoria_id
        `, [
            nome,
            descricao,
            ingredientes,
            imagem,
            ativo,
            categoryId
        ]);

        return rows[0];
    }

    async atualizar(id, dados) {

        const updates = [];
        const values = [];
        let index = 1;

        if (dados.nome !== undefined) {
            updates.push(`nome = $${index++}`);
            values.push(dados.nome);
        }

        if (dados.descricao !== undefined) {
            updates.push(`descricao = $${index++}`);
            values.push(dados.descricao);
        }

        if (dados.ingredientes !== undefined) {
            updates.push(`ingredientes = $${index++}`);
            values.push(dados.ingredientes);
        }

        if (dados.imagem !== undefined) {
            updates.push(`imagem = $${index++}`);
            values.push(dados.imagem);
        }

        if (dados.ativo !== undefined) {
            updates.push(`ativo = $${index++}`);
            values.push(dados.ativo);
        }

        if (dados.categoria !== undefined) {
            const categoryResult = await db.query(
                'SELECT id FROM categories WHERE slug = $1',
                [dados.categoria]
            );

            if (categoryResult.rowCount === 0) {
                throw new Error("Categoria não encontrada.");
            }

            updates.push(`categoria_id = $${index++}`);
            values.push(categoryResult.rows[0].id);
        }

        if (updates.length === 0) {
            // Se nao ha campos, retorna o atual (ou erro)
            const existing = await this.buscarPorId(id);
            if (!existing) throw new Error("Drink não encontrado.");
            return existing;
        }

        values.push(id);
        const { rows } = await db.query(`
            UPDATE drinks
            SET ${updates.join(', ')}
            WHERE id = $${index}
            RETURNING id
        `, values);

        if (rows.length === 0) {
            throw new Error("Drink não encontrado.");
        }

        // Retorna o registro final atualizado
        return this.buscarPorId(id);
    }

    async ativar(id) {
        
        return this.#updateStatus(id, true);
    }

    async desativar(id) {
        
        return this.#updateStatus(id, false);
    }

    async #updateStatus(id, ativo) {
        // Atualiza apenas o campo "ativo" e retorna o registro
        const { rows } = await db.query(`
            WITH updated AS (
                UPDATE drinks
                SET ativo = $1
                WHERE id = $2
                RETURNING *
            )
            SELECT
                updated.id,
                updated.nome,
                updated.descricao,
                updated.ingredientes,
                updated.imagem,
                updated.ativo,
                c.slug AS categoria
            FROM updated
            JOIN categories c ON c.id = updated.categoria_id
        `, [ativo, id]);

        if (rows.length === 0) {
            throw new Error("Drink não encontrado.");
        }

        return rows[0];
    }

    async remover(id) {
        // Remove e retorna o registro removido
        const { rows } = await db.query(`
            WITH deleted AS (
                DELETE FROM drinks
                WHERE id = $1
                RETURNING *
            )
            SELECT
                deleted.id,
                deleted.nome,
                deleted.descricao,
                deleted.ingredientes,
                deleted.imagem,
                deleted.ativo,
                c.slug AS categoria
            FROM deleted
            JOIN categories c ON c.id = deleted.categoria_id
        `, [id]);

        if (rows.length === 0) {
            throw new Error("Drink não encontrado.");
        }

        return rows[0];
    }
}