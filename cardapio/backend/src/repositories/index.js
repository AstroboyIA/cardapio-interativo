import DrinksRepositoryJson from './drinks.repository.json.js';
import DrinksRepositoryPostgres from './drinks.repository.postgres.js';

export function makeDrinksRepository() {
    // Usa Postgres quando NODE_ENV for postgres
    if (process.env.NODE_ENV === 'postgres') {
        return new DrinksRepositoryPostgres();
    }

    // Caso contrario, usa JSON local
    return new DrinksRepositoryJson();
}

// Preparar troca automatica para Postgres usando DATABASE_URL ou DB_DRIVER
/* 
// Seleciona o repositorio Postgres quando a variavel estiver presente.
export function makeDrinksRepository() {
    // Usa DB_DRIVER=postgres para forcar o Postgres.
    if (process.env.DB_DRIVER === 'postgres') {
        return new DrinksRepositoryPostgres();
    }

    // Alternativa: usar DATABASE_URL como gatilho.
    if (process.env.DATABASE_URL) {
        return new DrinksRepositoryPostgres();
    }

    return new DrinksRepositoryJson();
}
*/
