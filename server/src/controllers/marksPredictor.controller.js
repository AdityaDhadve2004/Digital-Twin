import { AsyncHandler } from "../utils/asyncHandler.js";
import { findExamScoreById, createExamScore, checkIfExamScoreExists, updatedExamScores, createAnalysis, getAllPredictionAnalysis,updateAnalysis } from "../models/prediction.model.js";
import { findSubjectIdByCode } from "../models/subjects.model.js";
import { analyzeStudentPerformance } from "../services/geminiService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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

        const semester = Number(req.body.semester);
        const isa_total = Number(req.body.isa_total);
        const mse_marks = Number(req.body.mse_marks);
        const mse_total = Number(req.body.mse_total);
        const ese_total = Number(req.body.ese_total);
        const lab_total = Number(req.body.lab_total);
        const total_marks = Number(req.body.total_marks);



        const { grade, code } = req.body;

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

        const examScore = await createExamScore(req.user.id, subject.id, semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, prediction1, prediction2, marksRequired1, marksRequired2, total_marks, null, null, null);

        const addedExamScore = await findExamScoreById(examScore.id);

        if (!addedExamScore) {
            throw new ApiError(500, "Something went wrong while adding exam score data in the database")
        }
        const response = await analyzeStudentPerformance({ ...addedExamScore, subject:subject.name, eseMarksNeeded1: eseMarksNeeded1, eseMarksNeeded2: eseMarksNeeded2, meanMarksRequired: meanMarksRequired },"IA1")

        if (!response.success) {
            throw new ApiError(500, response.error);
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

        const semester = Number(req.body.semester);
        const isa_total = Number(req.body.isa_total);
        const mse_marks = Number(req.body.mse_marks);
        const mse_total = Number(req.body.mse_total);
        const ese_total = Number(req.body.ese_total);
        const lab_total = Number(req.body.lab_total);
        const total_marks = Number(req.body.total_marks);
        const mse2_marks = Number(req.body.mse2_marks);

        const { grade, code } = req.body;
        if (!isa_total || !mse_marks || !semester || !mse_total || !ese_total || !lab_total || !total_marks || !grade || !mse2_marks) {
            throw new ApiError(400, "All fields are required")
        }

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

            if (isExists.mse_marks !== mse_marks) {
                throw new ApiError(400,"Wrong marks mse_1 marks entered")     
            }
            const updatingExamScores = await updatedExamScores(prediction, marksObtained, mse2_marks, isExists.id, subject.id, semester);

            const checkExamScoreExist = await findExamScoreById(updatingExamScores.id);

            if (!checkExamScoreExist) {
                throw new ApiError(500, "Something went wrong while updating exam score data in the database")
            }

            const response = await analyzeStudentPerformance({ ...checkExamScoreExist, subject : subject.name , meanMarksRequired: meanMarksRequired },"IA2_COMPARISON");

            if (!response) {
                ApiError(500, "Something went wrong while analyzing predictions")

            }

            const analysisRes = await updateAnalysis(checkExamScoreExist.id, req.user.id, "IA-2", response.analysis);

            if (!analysisRes) {
                throw new ApiError(500, "Something went wrong while adding analysis in the database")
            }

            return res.status(201).json(
                new ApiResponse(201, { type: analysisRes.analysis_type, text: analysisRes.gemini_analysis }, "Analyzed exam score successfully")
            )
        }
        else {
            const examScore = await createExamScore(req.user.id, subject.id, semester, isa_total, mse_marks, mse_total, ese_total, lab_total, grade, code, null, null, null, null, total_marks, prediction, marksObtained, mse2_marks);
            const addedExamScore = await findExamScoreById(examScore.id);

            if (!addedExamScore) {
                throw new ApiError(500, "Something went wrong while adding exam score data in the database")
            }

            const response = await analyzeStudentPerformance({ ...addedExamScore, subject : subject.name, meanMarksRequired: meanMarksRequired },"IA2_FIRST_TIME");

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
const getAllUserIA1Analysis = AsyncHandler(
    async (req, res) => {
        const allUserAnalysis = await getAllPredictionAnalysis(req.user.id,"IA-1");
        if (!allUserAnalysis) {
            throw new ApiError(500, "Something went wrong while fetching analysis data")
        }
        return res.status(201).json(
            new ApiResponse(201, allUserAnalysis, "Fetched analysis data successfully")
        )

    }
)
const getAllUserIA2Analysis = AsyncHandler(
    async (req, res) => {
        const allUserAnalysis = await getAllPredictionAnalysis(req.user.id,"IA-2");
        if (!allUserAnalysis) {
            throw new ApiError(500, "Something went wrong while fetching analysis data")
        }
        return res.status(201).json(
            new ApiResponse(201, allUserAnalysis, "Fetched analysis data successfully")
        )

    }
)
export { getEarlyMidSemPredictions, getEndSemPredictions, getAllUserIA1Analysis, getAllUserIA2Analysis}    