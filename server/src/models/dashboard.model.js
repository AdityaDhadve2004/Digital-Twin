import { pool } from "../db/connect.js";
export const createDashboardDataModel = async(userId,currentCgpa,targetCgpa,requiredSgpa,semester) => {
    const res = await pool.query(
        `INSERT INTO dashboard(
            user_id,
            current_cgpa,
            target_cgpa,
            required_sgpa,
            semester
        )
         VALUES(
            $1,
            $2,
            $3,
            $4,
            $5
         ) 
         RETURNING *     
         `,
        [userId,currentCgpa,targetCgpa,requiredSgpa,semester]
    )
    return res.rows[0];
}
export const findByIdDashboardModel = async(userId) => {
    const res = await pool.query(
        `SELECT * FROM dashboard WHERE user_id=$1`,
        [userId]
    )
    return res.rows[0];

}
export const deleteDashBoardDataModel = async(userId) => {
    const res = await pool.query(
        `DELETE FROM dashboard WHERE user_id=$1`,
        [userId]
    )
    return res.rows[0];
}