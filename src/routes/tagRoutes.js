import { Router } from "express";
import { createTag, getTags, getTagById, updateTag, deleteTag } from "../controllers/tagController.js";
import { validateCreateTag } from '../middlewares/validators/tagValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.get('/tags', getAllTags);
router.post('/tags', validateCreateTag, handleValidationErrors, createTag);
router.get('/tags/:id', validateTagId, handleValidationErrors, getTagById);
router.put('/tags/:id', validateTagId, validateUpdateTag, handleValidationErrors, updateTag);
router.delete('/tags/:id', validateTagId, handleValidationErrors, deleteTag);

export default router;