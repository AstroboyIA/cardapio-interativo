import dns from 'dns';
import pkg from 'pg';
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === 'production';
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

if (hasDatabaseUrl) {
  try {
    const { host } = new URL(process.env.DATABASE_URL);
    console.log(`[db] DATABASE_URL detected host=${host} ssl=${isProduction}`);
  } catch {
    console.warn('[db] DATABASE_URL present but invalid.');
  }
} else {
  console.warn('[db] DATABASE_URL not set; falling back to DB_HOST/DB_PORT.');
}

async function createPool() {
  if (!process.env.DATABASE_URL) {
    return new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  const url = new URL(process.env.DATABASE_URL);
  const originalHost = url.hostname;
  let resolvedHost = originalHost;

  try {
    const { address } = await dns.promises.lookup(originalHost, { family: 4 });
    resolvedHost = address;
  } catch (error) {
    console.warn(`[db] IPv4 lookup failed for ${originalHost}: ${error?.message || error}`);
  }

  const ssl = isProduction
    ? { rejectUnauthorized: false, servername: originalHost }
    : false;

  return new Pool({
    host: resolvedHost,
    port: url.port || 5432,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace('/', ''),
    ssl,
  });
}

const pool = await createPool();

pool.on('error', (error) => {
  console.error('[db] Pool error:', error?.message || String(error));
});

export default {
  query: (text, params) => pool.query(text, params),
};
