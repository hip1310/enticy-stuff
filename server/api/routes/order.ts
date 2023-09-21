import {
  changeOrderStatus,
  findAll,
  findOneByUserIdAndName,
} from "../controllers/order";
import { Router } from "express";
const router = Router();

router.get("/findAll", [findAll]);
router.get("/findOneByUserIdAndName", [findOneByUserIdAndName]);
router.post("/changeOrderStatus", [changeOrderStatus]);

export default router;
