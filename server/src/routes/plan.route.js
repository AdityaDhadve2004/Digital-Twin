import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { generatePlan,getAllPlans,changeCurrentDayInPlan,changeStatusForPlan } from "../controllers/planner.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router()
router.route("/plan").post(upload.single("referenceImage"),verifyJWT,generatePlan);
router.route("/all-plans").get(verifyJWT,getAllPlans);
router.route("/change-day/:planId").patch(verifyJWT,changeCurrentDayInPlan);
router.route("/status/:planId").patch(verifyJWT,changeStatusForPlan);
export default router