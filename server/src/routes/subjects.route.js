import { Router} from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { addSubject,getAllSubjects,deleteSubject,getSubject,updateSubject } from "../controllers/subjects.controller.js";

const router = Router();
router.route("/add-subject").post(verifyJWT,addSubject);
router.route("/all-subjects").get(verifyJWT,getAllSubjects);
router.route("/:subjectId").delete(verifyJWT,deleteSubject);
router.route("/:subjectId").get(verifyJWT,getSubject);
router.route("/:subjectId").patch(verifyJWT,updateSubject);

export default router;