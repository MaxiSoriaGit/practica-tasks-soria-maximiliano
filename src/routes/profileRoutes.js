import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profileController.js";
import { validateCreateProfile } from '../middlewares/validators/profileValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.get('/profiles', getAllProfiles);
router.post('/profiles', validateCreateProfile, handleValidationErrors, createProfile);
router.get('/profiles/:id', validateProfileId, handleValidationErrors, getProfileById);
router.put('/profiles/:id', validateProfileId, validateUpdateProfile, handleValidationErrors, updateProfile);
router.delete('/profiles/:id', validateProfileId, handleValidationErrors, deleteProfile);
export default router;