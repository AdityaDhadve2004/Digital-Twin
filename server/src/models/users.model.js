import { pool } from "../db/connect"
export const findUserById = async(id) => {
    const res = await pool.query(
        "SELECT * FROM users WHERE id=$1"
        [id]
    )
    return res.rows[0];
};