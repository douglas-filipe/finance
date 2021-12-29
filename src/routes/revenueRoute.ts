import { Router } from "express";
import { CreateRevenueController } from "../controllers/revenues/CreateRevenueController";

const router = Router();

router.post("/", CreateRevenueController);

export default router;
