import { Router} from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { getEarlyMidSemPredictions,getEndSemPredictions,getAllUserIA1Analysis,getAllUserIA2Analysis } from "../controllers/marksPredictor.controller.js";

const router = Router()
router.route("/ia1").post(verifyJWT,getEarlyMidSemPredictions);
router.route("/ia2").post(verifyJWT,getEndSemPredictions);
router.route("/all-ia1-analysis").get(verifyJWT,getAllUserIA1Analysis);
router.route("/all-ia2-analysis").get(verifyJWT,getAllUserIA2Analysis);
export default router