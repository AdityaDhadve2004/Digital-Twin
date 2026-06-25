import { AsyncHandler } from "../utils/AsyncHandler.js";
import { checkExistedSubjectModel, addSubjectsModel, findSubjectByIdModel, getAllSubjectsModel, deleteSubjectModel, updateSubjectModel } from "../models/subjects.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const addSubject = AsyncHandler(
    async (req, res) => {
        const { name, credits, semester, grade, code } = req.body;

        if (!name || !credits || !semester || !code) {
            throw new ApiError(400, "All fields are required")
        }

        const existedSubject = await checkExistedSubjectModel(req.user.id, name);

        if (existedSubject) {
            throw new ApiError(409, "Subject already exists")
        }

        const newSubject = await addSubjectsModel(req.user.id, name, credits, semester, grade, code);

        const addedSubject = await findSubjectByIdModel(newSubject.id);

        if (!addedSubject) {
            throw new ApiError(500, "Something went wrong while fetching subject data")
        }

        return res.status(201).json(
            new ApiResponse(201, addedSubject, "Subject added successfully")
        )
    }
)
const getAllSubjects = AsyncHandler(
    async (req, res) => {
        const allSubjects = await getAllSubjectsModel(req.user.id);

        if (!allSubjects) {
            throw new ApiError(500, "Something went wrong while fetching all subjects data")
        }

        return res.status(201).json(
            new ApiResponse(201, allSubjects, "All subjects fetched successfully")
        )
    }
)
const deleteSubject = AsyncHandler(
    async (req, res) => {
        const { subjectId } = req.params;
        const subject = await findSubjectByIdModel(subjectId);
        if (subject.user_id.toString() !== req.user.id.toString()) {
            throw new ApiError(403, "Not authorized to delete the subject")
        }
        await deleteSubjectModel(subjectId);
        return res.status(201).json(
            new ApiResponse(201, {}, "Successfully deleted subject")
        )
    }
)
const getSubject = AsyncHandler(
    async (req, res) => {
        const { subjectId } = req.params;
        const subject = await findSubjectByIdModel(subjectId);
        if (!subject) {
            throw new ApiError(500, "Something went wrong while fetching subject data")
        }
        return res.status(201).json(
            new ApiResponse(201, subject, "Successfully deleted subject")
        )

    }
)
const updateSubject = AsyncHandler(
    async (req, res) => {
        const { subjectId } = req.params
        const { name, credits, semester, grade, code } = req.body;
        const subject = await findSubjectByIdModel(subjectId);
        if (subject.user_id.toString() !== req.user.id.toString()) {
            throw new ApiError(403, "Not authorized to update the subject")
        }
        const updatedSubject = await updateSubjectModel(name, credits, semester, grade, code, subjectId);
        const updatedRegisteredSubject = await findSubjectByIdModel(updatedSubject.id);

        if (!updatedRegisteredSubject) {
            throw new ApiError(500, "Something went wrong while updating subject data")
        }
        return res.status(201).json(
            new ApiResponse(201, updatedRegisteredSubject, "Subject updated successfully")
        )
    }
)
export {addSubject,getAllSubjects,deleteSubject,getSubject,updateSubject}