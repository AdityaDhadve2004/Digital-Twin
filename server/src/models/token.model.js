import { pool } from "../db/connect.js"
export const setRefreshToken = async (ownerId, token) => {
    const res = await pool.query(
        `
    INSERT INTO refresh_tokens (
        id,
        user_id,
        token,
        expires_at
    )
    VALUES (
        uuid_generate_v4(),
        $1,
        $2,
        NOW() + INTERVAL '10 days'
    )

    ON CONFLICT (user_id)

    DO UPDATE SET
        token = EXCLUDED.token,
        expires_at = EXCLUDED.expires_at

    RETURNING *
    `,
        [ownerId, token]
    )
    return res.rows[0];
}
export const clearRefreshToken = async (id) => {
    const res = await pool.query(
        `DELETE FROM refresh_tokens WHERE user_id=$1`,
        [id]

    )
    return res.rows;
}