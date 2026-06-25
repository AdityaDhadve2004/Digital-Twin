import { AsyncHandler } from "../utils/AsyncHandler.js";
import { getAllSubjectsModel } from "../models/subjects.model.js";
import { calculateSGPA } from "../utils/sgpaCalculator.js";
import { calculateCGPA } from "../utils/cgpaCalculator.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getCGPA = AsyncHandler(
    async (req, res) => {
        const allSemesterSubjects = await getAllSubjectsModel(req.user.id)
        let arr = [];
        for (let i = 1; i <= 8; i++) {
            const specificSemesterSubjects = allSemesterSubjects.filter(subject =>
                subject.semester === i && subject.grade !== null
            )

            if (specificSemesterSubjects.length === 0) {
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
        const cgpa = calculateCGPA(arr)
        return res.status(200).json(
            new ApiResponse(200, {
                cgpa: cgpa,
                completedSemesters: arr.length,
                breakdown: arr
            }, "CGPA calculated successfully")
        )
    }
)
export { getCGPA }