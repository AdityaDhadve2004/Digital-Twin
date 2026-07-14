import { pool } from "../db/connect.js";
export const createPlanModel = async(userId,subjectId,title,category,description,date,duration,hours,priority) => {
    const res = await pool.query(
        `INSERT INTO planner (id,user_id,subject_id,title,category,description,start_date,duration_days,estimated_hours,priority)
         VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
        `,
        [userId,subjectId || null,title,category,description,date,duration,hours,priority]
    )
    return res.rows[0];
}
export const updatePlanModel  = async(responseText,value,planId) => {
    const res = await pool.query(
        `UPDATE planner
         SET 
         daily_plan = $1,
         ai_generated = $2
         WHERE id = $3
         RETURNING *`,
        [responseText,value,planId] 
    )
    return res.rows[0];
}
export const deletePlanModel = async(planId) => {
    const res = await pool.query(
        `DELETE FROM planner WHERE id=$1`,
        [planId]
    )    
}
export const getAllPlansModel = async(userId) => {
    const res = await pool.query(
        `SELECT * FROM planner WHERE user_id=$1`,
        [userId]
    )
    return res.rows;

}
export const updatePlanDayModel = async(planId) => {
    const res = await pool.query(
        `UPDATE planner
         SET 
         current_day = current_day + 1
         WHERE id=$1
         RETURNING *`,
        [planId]
    )
    return res.rows[0];
}
export const updatePlanStatusModel = async(planId,status) => {
    const res = await pool.query(
        `UPDATE planner
         SET 
         status = $2
         WHERE id=$1
         RETURNING *`,
        [planId,status]
    )
    return res.rows[0];
}