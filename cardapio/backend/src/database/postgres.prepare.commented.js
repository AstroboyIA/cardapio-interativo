// Arquivo de preparo para migracao ao PostgreSQL (tudo comentado)

// SQL para criar tabelas e categorias base
/*
-- Cria tabela de categorias com slug unico.
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Cria tabela de drinks com FK para categorias.
CREATE TABLE IF NOT EXISTS drinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  ingredientes TEXT NOT NULL,
  imagem TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  categoria_id INTEGER NOT NULL REFERENCES categories(id),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Insere as 3 categorias fixas.
INSERT INTO categories (nome, slug) VALUES
  ('Drinks Classicos', 'drinksClassicos'),
  ('Drinks Autorais', 'drinksAutorais'),
  ('Coqueteis', 'drinksCoqueteis')
ON CONFLICT (slug) DO NOTHING;
*/

// Script Node para importar JSON em Postgres
/*
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

// Resolve caminho do JSON atual.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../data/drinks.json');

// Carrega o JSON em memoria.
const raw = fs.readFileSync(DATA_PATH, 'utf-8');
const data = JSON.parse(raw);

// Mapeia slug para id da categoria.
async function getCategoryIdMap() {
  const { rows } = await db.query('SELECT id, slug FROM categories');
  const map = new Map();
  for (const row of rows) {
    map.set(row.slug, row.id);
  }
  return map;
}

// Insere os drinks do JSON no Postgres.
async function importDrinks() {
  const map = await getCategoryIdMap();

  for (const [slug, drinks] of Object.entries(data)) {
    const categoriaId = map.get(slug);
    if (!categoriaId) {
      console.log(`Categoria nao encontrada: ${slug}`);
      continue;
    }

    for (const drink of drinks) {
      await db.query(
        `
        INSERT INTO drinks
        (nome, descricao, ingredientes, imagem, ativo, categoria_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          drink.nome,
          drink.descricao,
          drink.ingredientes,
          drink.imagem || '',
          Boolean(drink.ativo),
          categoriaId
        ]
      );
    }
  }
}

// Executa o processo de importacao.
importDrinks()
  .then(() => {
    console.log('Importacao finalizada.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro na importacao:', err);
    process.exit(1);
  });
*/
