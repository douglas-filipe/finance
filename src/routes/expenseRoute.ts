import { Router } from "express";
import { CreateExpenseController } from "../controllers/expenses/CreateExpenseController";

const router = Router();

router.post("/", CreateExpenseController);


export default router;
