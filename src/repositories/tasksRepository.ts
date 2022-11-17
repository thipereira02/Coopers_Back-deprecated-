import "../setup";
import connection from "../database";

export async function getUserId(token: string) {
    const result = await connection.query(`
        SELECT * 
        FROM sessions 
        WHERE token = $1`,
        [token]
    );

    return result.rows[0];
}

export async function addTask(description: string, taskType: string, userId: number) {
    await connection.query(`
        INSERT INTO tasks 
        (description, "taskType", "userId", date) 
        VALUES ($1, $2, $3, NOW())`,
        [description, taskType, userId]
    );
}