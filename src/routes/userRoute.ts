import { CreateUserController } from "../controllers/user/CreateUserController";
import { Router } from "express";
const router = Router();

import { LoginUserController } from "../controllers/user/LoginUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { GetUserController } from "../controllers/user/GetUserController";
import { verifyToken } from "../middlewares/VerifyToken";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { GetExpenseRevenueAndTotalController } from "../controllers/user/GetExpenseRevenueAndTotalController";

router.post("/register", CreateUserController);
router.post("/login", LoginUserController);
router.put("/:id", verifyToken, UpdateUserController);
router.get("/:id", verifyToken, GetUserController);
router.delete("/:id", verifyToken, DeleteUserController);
router.get("/total/:id", GetExpenseRevenueAndTotalController);

export default router;
