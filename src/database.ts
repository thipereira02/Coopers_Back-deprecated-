import './setup';
import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default connection;