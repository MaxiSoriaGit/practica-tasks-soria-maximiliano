import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateCreateTask, validateUpdateTask, validateTaskId } from '../middlewares/validators/taskValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', validateCreateTask, handleValidationErrors, createTask);
router.get('/tasks/:id', validateTaskId, handleValidationErrors, getTaskById);
router.put('/tasks/:id', validateTaskId, validateUpdateTask, handleValidationErrors, updateTask);
router.delete('/tasks/:id', validateTaskId, handleValidationErrors, deleteTask);

export default router;