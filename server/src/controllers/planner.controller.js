import { deletePlanModel, createPlanModel, updatePlanModel,getAllPlansModel,updatePlanDayModel,updatePlanStatusModel } from "../models/plan.model.js";
import { findSubjectIdByCodeModel } from "../models/subjects.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { createAiPlan } from "../services/AiPlanService.js";

import fs from "fs";

async function deleteFile(filePath) {
    try {
        await fs.promises.unlink(filePath);
        console.log('File deleted successfully');
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
    }
}

const generatePlan = AsyncHandler(

    async (req, res) => {
        let referenceLocalPath = req.file?.path;
        try {
            const { title, description, duration, date, category, hours, priority, code } = req.body;
            if (!title || !description || !duration || !date || !category || !hours || !priority) {
                throw new ApiError(400, "All fields are required")
            }
            let subjectId = null;
            let subjectName = null;
            let subject;
            if (code) {
                subject = await findSubjectIdByCodeModel(req.user.id, code);
                if (!subject) {
                    throw new ApiError(404, "Subject not found")
                }
                subjectId = subject.id;
                subjectName = subject.name;
            }
            const plan = await createPlanModel(req.user.id, subjectId, title, category, description, date, duration, hours, priority);

            if (!plan.id) {
                throw new ApiError(500, "Plan is not added")
            }

            const response = await createAiPlan({ title, subjectName, description, date, duration, hours, priority, referenceLocalPath })

            if (!response.success) {
                await deletePlanModel(plan.id);
                throw new ApiError(500, response.error);
            }

            const completeAiPlan = await updatePlanModel(response.data, true, plan.id);

            return res.status(201).json(
                new ApiResponse(201, completeAiPlan, "AI Planner created successfully")
            )

        } finally {
            if (referenceLocalPath) {
                await deleteFile(referenceLocalPath);
            }
        }
    }


)


const getAllPlans = AsyncHandler(
    async (req, res) => {
        const allPlans = await getAllPlansModel(req.user.id);

        return res.status(201).json(
            new ApiResponse(201, allPlans, "All Plans Fetched Successfully")
        )
    }
)

const changeCurrentDayInPlan = AsyncHandler(
    async(req,res) => {
        const { planId } = req.params;
        const changedDayPlan = await updatePlanDayModel(planId);
        return res.status(201).json(
            new ApiResponse(201, changedDayPlan, "All Plans Fetched Successfully")
        )
    }
)
const changeStatusForPlan = AsyncHandler(
    async(req,res)=>{
        const { planId } = req.params;
        const completedPlan = await updatePlanStatusModel(planId,"COMPLETED");
        return res.status(201).json(
            new ApiResponse(201, completedPlan, "All Plans Fetched Successfully")
        )
    }
)
export { generatePlan,getAllPlans,changeCurrentDayInPlan,changeStatusForPlan }