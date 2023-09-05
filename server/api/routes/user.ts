import { createUser } from "../controllers/user";
import { Router } from "express";
const router = Router();

router.post("/create", [createUser]);

export default router;
