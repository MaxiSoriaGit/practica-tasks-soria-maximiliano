import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateCreateTask, validateUpdateTask, validateTaskId } from '../middlewares/validators/taskValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.post('/api',validateCreateTask, handleValidationErrors , createTask);
router.get('/api',getTasks);
router.get('/api', validateTaskId, handleValidationErrors ,getTaskById);
router.put('/api', validateUpdateTask, handleValidationErrors,updateTask);
router.delete('/api', validateTaskId, handleValidationErrors,deleteTask);

export default router;