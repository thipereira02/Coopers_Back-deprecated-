import supertest from 'supertest';
import connection from '../../database';
import app from '../../app';

export const agent = supertest(app);

export async function clearDatabase() {
    await connection.query('TRUNCATE TABLE users, sessions, tasks RESTART IDENTITY');
}

export async function closeConnection() {
    await connection.end();
}