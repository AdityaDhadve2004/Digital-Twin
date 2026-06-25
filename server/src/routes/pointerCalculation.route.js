import { Router } from "express";
import { getSemesterSGPA,getAllSemesterSGPA } from "../controllers/sgpa.controller.js";
import { getCGPA } from "../controllers/cgpa.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
const router = Router()

router.route("/sgpa/:semester").get(verifyJWT,getSemesterSGPA)
router.route("/all-sgpa").get(verifyJWT,getAllSemesterSGPA)
router.route("/cgpa").get(verifyJWT,getCGPA)

export default router