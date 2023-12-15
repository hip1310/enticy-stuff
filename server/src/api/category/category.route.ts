import { Router } from "express";
import { categorySync } from "./category.controller";

const router = Router();

router.post("/categorySync", [categorySync]);

export default router;
