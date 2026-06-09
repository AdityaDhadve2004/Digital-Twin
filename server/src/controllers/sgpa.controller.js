import { AsyncHandler } from "../utils/AsyncHandler.js";
import { getAllSubjectsBySemModel } from "../models/subjects.model.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateSGPA } from "../utils/sgpaCalculator.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAllSubjectsModel } from "../models/subjects.model.js";
const getSemesterSGPA = AsyncHandler(
    async (req, res) => {
        const { semester } = req.params;
        const semesterSubjects = await getAllSubjectsBySemModel(req.user.id, semester);
        const hasAllGrades = semesterSubjects.every(s =>
            s.grade !== null
        )
        if (!hasAllGrades) {
            throw new ApiError(400, "Not all subjects have grades yet")
        }
        const sgpa = calculateSGPA(semesterSubjects);

        return res.status(200).json(
            new ApiResponse(200, { pointer: sgpa, sem: semester }, "SGPA calculated successfully")
        )
    }
)
const getAllSemesterSGPA = AsyncHandler(
    async (req, res) => {
        const allSemesterSubjects = await getAllSubjectsModel(req.user.id)
        let arr = [];
        for (let i = 1; i <= 8; i++) {
            const specificSemesterSubjects = allSemesterSubjects.filter(subject =>
                subject.semester === i
            )

            if (specificSemesterSubjects.length === 0) {
                continue
            }

            const hasAllGrades = specificSemesterSubjects.every(s => s.grade !== null)

            if (!hasAllGrades) {
                continue 
            }

            const sgpa = calculateSGPA(specificSemesterSubjects)

            arr.push({
                pointer: sgpa,
                sem: i 
            })
        }
        if (arr.length === 0) {
            throw new ApiError(400, "No completed semesters with all grades")
        }
        return res.status(200).json(
            new ApiResponse(200, arr, "All SGPA's calculated successfully")
        )


    }

)
export { getSemesterSGPA , getAllSemesterSGPA }