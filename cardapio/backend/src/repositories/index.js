import DrinksRepositoryJson from './drinks.repository.json.js';
import DrinksRepositoryPostgres from './drinks.repository.postgres.js';

export function makeDrinksRepository() {
    if (process.env.NODE_ENV === 'postgres') {
        return new DrinksRepositoryPostgres();
    }

    return new DrinksRepositoryJson();
}