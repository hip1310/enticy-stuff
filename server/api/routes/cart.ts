import { addOrUpdate, moveCartItem, findAll, findOneByUserIdAndName } from "../controllers/cart";
import { Router } from "express";
const router = Router();

router.post("/add", [addOrUpdate]);
router.get("/findAll", [findAll]);
router.get("/findOneByUserIdAndName", [findOneByUserIdAndName]);
router.patch("/moveCartItem", [moveCartItem]);



export default router;
