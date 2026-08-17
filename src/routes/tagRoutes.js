import { Router } from "express";
import { createTag, getTags } from "../controllers/tagController.js";

const router = Router();

router.post("/", createTag);
router.get("/", getTags);

export default router;