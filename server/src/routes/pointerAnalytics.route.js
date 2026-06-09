import { Router } from "express";
import { getSemesterSGPA,getAllSemesterSGPA } from "../controllers/sgpa.controller";
import { getCGPA } from "../controllers/cgpa.controller";
import { verifyJWT } from "../middlewares/auth";
const router = Router()

router.route("/sgpa/:semester").get(verifyJWT,getSemesterSGPA)
router.route("all-sgpa").get(verifyJWT,getAllSemesterSGPA)
router.route("/cgpa").get(verifyJWT,getCGPA)

export default router