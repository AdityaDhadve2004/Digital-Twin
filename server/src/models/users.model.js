import { pool } from "../db/connect.js"
export const findUserById = async(id) => {
    const res = await pool.query(
        `SELECT id,name,email,created_at FROM users WHERE id=$1`,
        [id]
    )
    return res.rows[0];
};
export const checkExistedUser = async(username,email) => {
    const res = await pool.query(
        `SELECT * FROM users WHERE name=$1 AND email=$2`,
        [username,email]
    )
    return res.rows[0];
}
export const createUser = async(username,email,password) => {
    const res = await pool.query(
        `INSERT INTO users (id,name,email,password,created_at)
         VALUES(uuid_generate_v4(),$1,$2,$3,) RETURNING *`,
        [username,email,password]
    )
    return res.rows[0];

}
export const findUserByEmail = async(email) => {
    const res = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    )
    return res.rows[0];

}