import { AsyncHandler } from "../utils/asyncHandler";
import { findExamScoreById, createExamScore, checkIfExamScoreExists,updatedExamScores } from "../models/prediction.model";
import { findSubjectIdByCode } from "../models/subjects.model";
import { analyzeStudentPerformance } from "../services/geminiService";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
const GRADE_CONVERSION = {
    "O": {
        lowerLimit: 80, upperLimit: 100
    },
    "A": {
        lowerLimit: 75, upperLimit: 79.99
    },
    "B": {
        lowerLimit: 70, upperLimit: 74.99
    },
    "C": {
        lowerLimit: 60, upperLimit: 69.99
    },
    "D": {
        lowerLimit: 50.01, upperLimit: 59.99
    },
    "E": {
        lowerLimit: 45, upperLimit: 50
    },
    "P": {
        lowerLimit: 40, upperLimit: 44.99
    },
    "F": {
        lowerLimit: 1, upperLimit: 39.99
    }
}
const getEarlyMidSemPredictions = AsyncHandler(
    async (req, res) => {
        const { semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, total_marks } = req.body;
        if (!isa_total || !mse_marks || !semester || !mse_total || !ese_total || !lab_total || !total_marks || !grade) {
            throw new ApiError(400, "All fields are required")
        }
        const lowerLimitMarks = (GRADE_CONVERSION[grade].lowerLimit * total_marks) / 100;

        const upperLimitMarks = (GRADE_CONVERSION[grade].upperLimit * total_marks) / 100;

        const meanMarksRequired = (lowerLimitMarks + upperLimitMarks) / 2;
        let eseMarksNeeded1;
        let eseMarksNeeded2;
        let marksRequired1;
        let marksRequired2;
        let prediction1;
        let prediction2;
        let mseAvg = mse_total;
        if (mseAvg === mse_total) {
            marksRequired1 = mseAvg + isa_total + lab_total;
            eseMarksNeeded1 = meanMarksRequired - marksRequired1;
            prediction1 = ((eseMarksNeeded1 / ese_total) * 100).toFixed(2);
            mseAvg = (mse_marks + mse_total) / 2;
        }
        if (mseAvg === (mse_marks + mse_total) / 2) {
            marksRequired2 = mseAvg + isa_total + lab_total;
            eseMarksNeeded2 = meanMarksRequired - marksRequired2;
            prediction2 = ((eseMarksNeeded2 / ese_total) * 100).toFixed(2);
        }
        const subject = await findSubjectIdByCode(req.user.id, semester, code);

        if (!subject) {
            throw new ApiError(500, "Subject is not added")
        }

        const examScore = await createExamScore(req.user.id, subject.id, semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, prediction1, prediction2, marksRequired1, marksRequired2, total_marks,null,null,null);

        const addedExamScore = await findExamScoreById(examScore.id);

        if (!addedExamScore) {
            throw new ApiError(500, "Something went wrong while adding exam score data in the database")
        }
        const response = await analyzeStudentPerformance({ ...addedExamScore, prediction1: `${prediction1}%`, prediction2: `${prediction2}%`, marksRequired1: marksRequired1, marksRequired2: marksRequired2, eseMarksNeeded1 : eseMarksNeeded1,eseMarksNeeded2 : eseMarksNeeded2, grade: grade, meanMarksRequired: meanMarksRequired })

        if (!response) {
            ApiError(500, "Something went wrong while analyzing predictions")

        }

        const analysisRes = await createAnalysis(addedExamScore.id, req.user.id, "IA-1", response.analysis);

        if (!analysisRes) {
            throw new ApiError(500, "Something went wrong while adding prediction analysis in the database")
        }

        return res.status(201).json(
            new ApiResponse(201, { type: analysisRes.analysis_type, text: analysisRes.gemini_analysis }, "Analyzed exam score successfully")
        )



    })

const getEndSemPredictions = AsyncHandler(
    async (req, res) => {
        const { semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, mse2_marks, total_marks } = req.body;

        const lowerLimitMarks = (GRADE_CONVERSION[grade].lowerLimit * total_marks) / 100;

        const upperLimitMarks = (GRADE_CONVERSION[grade].upperLimit * total_marks) / 100;

        const meanMarksRequired = (lowerLimitMarks + upperLimitMarks) / 2;

        const mseTotal = mse_marks + mse2_marks;
        const marksObtained = isa_total + mseTotal + lab_total;

        const prediction = (((meanMarksRequired - marksObtained) / ese_total) * 100).toFixed(2);

        const subject = await findSubjectIdByCode(req.user.id, semester, code);

        if (!subject) {
            throw new ApiError(500, "Subject is not added")
        }

        const isExists = await checkIfExamScoreExists(req.user.id, subject.id, semester, code);

        if (isExists) {
            const updatingExamScores = await updatedExamScores(prediction, marksObtained, mse2_marks, isExists.id, subject.id, semester);

            const updatedExamScores = await findExamScoreById(updatingExamScores.id);

            if (!updatedExamScores) {
                throw new ApiError(500, "Something went wrong while updating exam score data in the database")
            }

            const response = await analyzeStudentPerformance({ ...updatedExamScores, Prediction1: `${prediction}%`, marksObtained: marksObtained, grade: grade, meanMarksRequired: meanMarksRequired });

            if (!response) {
                ApiError(500, "Something went wrong while analyzing predictions")

            }

            const analysisRes = await updateAnalysis(updatedExamScores.id, req.user.id, "IA-2", response.analysis);

            if (!analysisRes) {
                throw new ApiError(500, "Something went wrong while adding analysis in the database")
            }

            return res.status(201).json(
                new ApiResponse(201, { type: analysisRes.analysis_type, text: analysisRes.gemini_analysis }, "Analyzed exam score successfully")
            )
        }
        else {
            const examScore = await createExamScore(req.user.id, subject.id, semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, null ,null ,null ,null ,total_marks, prediction, marksObtained, mse2_marks);
            const addedExamScore = await findExamScoreById(examScore.id);

            if (!addedExamScore) {
                throw new ApiError(500, "Something went wrong while adding exam score data in the database")
            }

            const response = await analyzeStudentPerformance({ ...addedExamScore, prediction1: `${prediction}%`, marksObtained: marksObtained, grade: grade, meanMarksRequired: meanMarksRequired });

            const analysisRes = await createAnalysis(addedExamScore.id, req.user.id, "IA-2", response.analysis);

            if (!analysisRes) {
                throw new ApiError(500, "Something went wrong while adding analysis in the database")
            }

            return res.status(201).json(
                new ApiResponse(201, { type: analysisRes.analysis_type, text: analysisRes.gemini_analysis }, "Analyzed exam score successfully")
            )
        }

    }
)
export { getEarlyMidSemPredictions,getEndSemPredictions }    