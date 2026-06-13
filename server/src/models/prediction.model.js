import { pool } from "../db/connect"
export const findExamScoreById = async (examScoreId) => {
    const res = await pool.query(
        `SELECT * FROM exam_scores WHERE id=$1`,
        [examScoreId]
    )
    return res.rows[0];
}
export const createExamScore = async (userId, subjectId, semester, isaTotal, mseMarks, mseTotal, eseTotal, labTotal, grade, code, prediction1, prediction2, marksReq1, marksReq2, totalMarks ,endPrediction, marksObtained, mse2Marks) => {
    const res = await pool.query(
        `INSERT INTO exam_scores (id,user_id,subject_id,semester,isa_total,mse_marks,mse_total,ese_total,lab_total,grade,code,ia1_pred_scenario1_ese_percent,ia1_pred_scenario2_ese_percent,ia1_marks_req_scenario1,ia1_marks_req_scenario2,total_marks,ia2_pred_ese_percent,ia2_marks_obtained,mse2_marks)
         VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *
        `,
        [userId, subjectId, semester, isaTotal, mseMarks, mseTotal, eseTotal, labTotal || 0, grade, code, prediction1 || 0, prediction2 || 0, marksReq1 || 0, marksReq2 || 0, totalMarks, endPrediction || 0, marksObtained || 0, mse2Marks ||0]
    )
    return res.rows[0];
}
export const createAnalysis = async (examScoreId, userId, analysis_type, text) => {
    const res = await pool.query(
        `INSERT INTO prediction_analysis (id,exam_score_id,user_id,analysis_type,gemini_analysis)
         VALUES(uuid_generate_v4(),$1,$2,$3,$4)
        `,
        [examScoreId, userId, analysis_type, text]
    )
    return res.rows[0];
}
export const checkIfExamScoreExists = async (userId, subjectId, semester, code) => {
    const res = await pool.query(
        `SELECT * FROM exam_scores WHERE user_id=$1 AND subject_id=$2 AND semester=$3 AND code=$4`,
        [userId, subjectId, semester, code]
    )
    return res.row[0];
}
export const updatedExamScores = async (endPrediction,marksObtained,mse2Marks, examScoreId, subjectId, semester) => {
    const res = await pool.query(
        `UPDATE exam_scores 
         SET 
         ia2_pred_ese_percent = $1,
         ia2_marks_obtained = $2,
         mse2_marks = $3,
         updated_at = NOW()
         WHERE id = $4 AND subject_id = $5 AND semester = $6
         RETURNING *`,
         [endPrediction,marksObtained,mse2Marks,examScoreId, subjectId, semester]
    )
    return res.rows[0];
}
export const updateAnalysis = async (examScoreId, userId, analysis_type, text) => {
    const res = await pool.query(
        `INSERT INTO prediction_analysis (id,exam_score_id, user_id, analysis_type, gemini_analysis)
         VALUES (uuid_generate_v4(),$1, $2, $3, $4)
         ON CONFLICT (exam_score_id, analysis_type) 
         DO UPDATE SET analysis_type=$3 gemini_analysis = $4, generated_at = NOW()
         RETURNING *`,
         [examScoreId, userId,analysis_type, text]
    )
    return res.rows[0];
}