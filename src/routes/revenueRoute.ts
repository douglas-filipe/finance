import { Router } from "express";
import { CreateRevenueController } from "../controllers/revenues/CreateRevenueController";
import { GetTotalRevenues } from "../controllers/revenues/GetTotalRevenuesController";

const router = Router();

router.post("/", CreateRevenueController);
router.get("/total", GetTotalRevenues);

export default router;
