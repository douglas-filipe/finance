import { Router } from "express";
import { CreateRevenueController } from "../controllers/revenues/CreateRevenueController";
import { verifyToken } from "../middlewares/VerifyToken";

const router = Router();

router.post("/", verifyToken,CreateRevenueController);

export default router;
