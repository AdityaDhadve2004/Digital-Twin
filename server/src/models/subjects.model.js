import { pool } from "../db/connect.js";
export const checkExistedSubjectModel = async(userId,name) => {
    const res = await pool.query(
        `SELECT * FROM subjects WHERE user_id=$1 AND name=$2`,
        [userId,name]
    )
    return res.rows[0];
};
export const addSubjectsModel = async(userId,name,credits,semester,grade,code) => {
    const res = await pool.query(
        `INSERT INTO subjects (id,user_id,name,credits,semester,grade,code)
         VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6) RETURNING *
        `,
        [userId,name,credits,semester,grade,code]
    )
    return res.rows[0];
}
export const findSubjectByIdModel = async(subjectId) => {
    const res = await pool.query(
        `SELECT * FROM subjects WHERE id=$1`,
        [subjectId]
    )
    return res.rows[0];
}
export const getAllSubjectsModel = async(userId) => {
    const res = await pool.query(
        `SELECT * FROM subjects WHERE user_id=$1`,
        [userId]
    )
    return res.rows;
}
export const deleteSubjectModel = async(taskId) => {
    const res = await pool.query(
        `DELETE FROM subjects WHERE id=$1`,
        [taskId]
    )
}
export const updateSubjectModel = async(name,credits,semester,grade,code,subjectId) => {
    const res = await pool.query(
        `UPDATE subjects
         SET name=$1,
             credits=$2,
             semester=$3,
             grade=$4,
             code=$5,
         WHERE id=$6
         RETURNING *   
         `,
         [name,credits,semester,grade,code,subjectId]
    )
    return res.rows[0];
}
export const getAllSubjectsBySemModel = async(userId,semester) => {
    const res = await pool.query(
        `SELECT * FROM subjects WHERE user_id=$1 AND semester=$2`,
        [userId,semester]
    )
    return res.rows;

}