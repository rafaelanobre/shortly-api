import { db } from "../database/database.connection.js";

export async function getUserByEmail(email){
    return db.query(`
        SELECT *
        FROM users
        WHERE email=$1
    `, [email]);
}

export async function newUserIfEmailNotExist(name, email, encryptedPassword){
    return db.query(`
        INSERT INTO users (name, email, password)
        SELECT $1, $2, $3
        WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = $2)
        RETURNING *
    `, [name, email, encryptedPassword]);
}