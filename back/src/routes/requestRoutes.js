import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createRequest,
  getRequests,
} from "../controllers/requestController.js";

const router = Router();

router.post("/", createRequest);
router.get("/", authMiddleware, getRequests);

export default router;
