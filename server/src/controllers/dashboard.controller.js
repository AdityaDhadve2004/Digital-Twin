import { AsyncHandler } from "../utils/AsyncHandler.js";
import { getAllSubjectsModel } from "../models/subjects.model.js";
import { calculateCGPA } from "../utils/cgpaCalculator.js";
import { calculateSGPA } from "../utils/sgpaCalculator.js";
import { ApiError } from "../utils/ApiError.js";
import { createDashboardDataModel, findByIdDashboardModel,deleteDashBoardDataModel } from "../models/dashboard.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createDashboardData = AsyncHandler(
    async (req, res) => {
        const { target } = req.params
        console.log(target);
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
        const requiredSgpa = (target * (arr.length + 1) - (cgpa * arr.length))
        const nextSem = arr.length + 1;
        Math.trunc(nextSem);
        const createData = await createDashboardDataModel(req.user.id, cgpa, target, requiredSgpa, nextSem);

        const dashboardData = await findByIdDashboardModel(req.user.id)

        if (!dashboardData) {
            throw new ApiError(500, "Something went wrong while adding dashboard data in the database")
        }

        return res.status(201).json(
            new ApiResponse(201, dashboardData, "Dashboard data added successfully in database")
        )
    }
)
const getDashBoardData = AsyncHandler(
    async (req, res) => {
        const dashBoardData = await findByIdDashboardModel(req.user.id);
        return res.status(201).json(
            new ApiResponse(201, dashBoardData, "Dashboard data added successfully in database")
        )
    }
)
const deleteDashBoardData = AsyncHandler(
    async (req, res) => {
        console.log("DELETE controller called");
        await deleteDashBoardDataModel(req.user.id);
        return res.status(201).json(
            new ApiResponse(201, "Dashboard data deleted successfully in database")
        )
    }
)
export { createDashboardData, getDashBoardData, deleteDashBoardData }