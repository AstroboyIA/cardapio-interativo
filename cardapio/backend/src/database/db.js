import dns from 'dns';
import pkg from 'pg';
const { Pool } = pkg;

if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
if (hasDatabaseUrl) {
  try {
    const { host } = new URL(process.env.DATABASE_URL);
    console.log(`[db] DATABASE_URL detected host=${host} ssl=${process.env.NODE_ENV === 'production'}`);
  } catch {
    console.warn('[db] DATABASE_URL present but invalid.');
  }
} else {
  console.warn('[db] DATABASE_URL not set; falling back to DB_HOST/DB_PORT.');
}

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

pool.on('error', (error) => {
  console.error('[db] Pool error:', error?.message || String(error));
});

// Interface para executar as queries
export default {
  query: (text, params) => pool.query(text, params),
};
