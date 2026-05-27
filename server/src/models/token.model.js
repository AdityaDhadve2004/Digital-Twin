import { pool } from "../db/connect"
export const setRefreshToken = async (ownerId,token) => {
    const res = await pool.query(
        `INSERT INTO refresh_tokens (id,user_id,token)
        VALUES(uuid_generate_v4(),$1,$2 RETURNING *`,
        [ownerId,token]
    )
    return res.rows[0];

}