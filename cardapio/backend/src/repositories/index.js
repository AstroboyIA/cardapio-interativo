import DrinksRepositoryJson from './drinks.repository.json.js';
import DrinksRepositoryPostgres from './drinks.repository.postgres.js';

export function makeDrinksRepository() {
    //conexão com postgres
    const usePostgres = process.env.DB_DRIVER === 'postgres'
        || Boolean(process.env.DATABASE_URL)
        || process.env.NODE_ENV === 'postgres'
        || Boolean(process.env.DB_HOST);

    if (usePostgres) {
        return new DrinksRepositoryPostgres();
    }

    // se falhar, usa JSON local
    return new DrinksRepositoryJson();
}