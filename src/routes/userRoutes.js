import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser, validateUserId } from '../middlewares/validators/userValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.get('/api', getAllUsers);
router.post('/api', validateCreateUser, handleValidationErrors, createUser);
router.get('/api', validateUserId, handleValidationErrors, getUserById);
router.put('/api', validateUpdateUser, handleValidationErrors, updateUser);
router.delete('/api', validateUserId, handleValidationErrors, deleteUser);

export default router;