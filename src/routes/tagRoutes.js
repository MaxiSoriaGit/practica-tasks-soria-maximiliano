import { Router } from "express";
import { createTag, getTags } from "../controllers/tagController.js";
import { validateCreateTag } from '../middlewares/validators/tagValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.post("/api", validateCreateTag, handleValidationErrors, createTag);
router.get("/api", getTags);

export default router;