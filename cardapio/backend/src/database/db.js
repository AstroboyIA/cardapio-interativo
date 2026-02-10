import pkg from 'pg';
const { Pool } = pkg;

// Conexao via DATABASE_URL (producao) ou variaveis separadas (local)
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

// Interface para executar as queries
export default {
  query: (text, params) => pool.query(text, params),
};
