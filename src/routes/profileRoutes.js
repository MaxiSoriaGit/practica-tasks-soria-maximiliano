import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profileController.js";
import { validateCreateProfile } from '../middlewares/validators/profileValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.post("/api", validateCreateProfile, handleValidationErrors, createProfile);
router.get("/api", getProfiles);

export default router;