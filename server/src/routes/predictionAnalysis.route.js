import { Router} from "express";
import { verifyJWT } from "../middlewares/auth";
import { getEarlyMidSemPredictions,getEndSemPredictions } from "../controllers/marksPredictor";

const router = Router()
router.route("/ia1").post(verifyJWT,getEarlyMidSemPredictions);
router.route("/ia2").post(verifyJWT,getEndSemPredictions)
export default router