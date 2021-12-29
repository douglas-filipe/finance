import { Router } from "express";
import { CreateExpenseController } from "../controllers/expenses/CreateExpenseController";
import { verifyToken } from "../middlewares/VerifyToken";

const router = Router();

router.post("/", verifyToken, CreateExpenseController);

export default router;
