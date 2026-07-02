import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { getDashBoardData,createDashboardData,deleteDashBoardData } from "../controllers/dashboard.controller.js";
const router = Router()
router.route("/:target").post(verifyJWT,createDashboardData)
router.route("/dashboard-data").get(verifyJWT,getDashBoardData);
router.route("/delete-dashdata").delete(verifyJWT,deleteDashBoardData)
export default router
