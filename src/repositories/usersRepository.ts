import "../setup";
import connection from "../database";

export async function userIsAvailable(username: string):Promise<boolean> {
    const result = await connection.query(`
        SELECT * 
        FROM users 
        WHERE username = $1
    `, [username]);

    return result.rows.length === 0;
}

export async function emailIsAvailable(email: string):Promise<boolean> {
    const result = await connection.query(`
        SELECT *
        FROM users
        WHERE email = $1
    `, [email]);
    
    return result.rows.length === 0;
}

export async function newUser(username: string, email: string, token: string, hash: string):Promise<string> {        
    const newUser = await connection.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id
    `, [username, email, hash]);
    
    const createSession = await connection.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2)
        RETURNING token
    `, [newUser.rows[0].id, token]);
    return createSession.rows[0].token;
}
