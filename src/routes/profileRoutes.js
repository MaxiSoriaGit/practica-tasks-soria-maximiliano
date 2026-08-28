import { Router } from "express";
import {createProfile,getProfiles} from "../controllers/profileController.js";
import {validateCreateProfile,validateProfileId} from '../middlewares/validators/profileValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.get('/profiles', getProfiles);

router.post('/profiles',validateCreateProfile,handleValidationErrors,createProfile);

export default router;