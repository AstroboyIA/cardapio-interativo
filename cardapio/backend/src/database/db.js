import pkg from 'pg';
const { Pool } = pkg;

// Conexao via variaveis separadas (local)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Interface simples para executar queries
export default {
  query: (text, params) => pool.query(text, params),
};

// Preparar conexao via DATABASE_URL (ex: Render)
/*
// Cria pool a partir de DATABASE_URL, com SSL em producao.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

// Exporta a interface de query padrao.
export default {
  query: (text, params) => pool.query(text, params),
};
*/
