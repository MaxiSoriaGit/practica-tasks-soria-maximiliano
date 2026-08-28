import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser, validateUserId } from '../middlewares/validators/userValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = Router();

// Obtener todos los usuarios
router.get('/users', getAllUsers);

// Crear un usuario nuevo
router.post('/users', validateCreateUser, handleValidationErrors, createUser);

// Obtener un usuario por ID
router.get('/users/:id', validateUserId, handleValidationErrors, getUserById);

// Actualizar un usuario por ID
router.put('/users/:id', validateUserId, validateUpdateUser, handleValidationErrors, updateUser);

// Eliminar un usuario por ID (Eliminación lógica con paranoid)
router.delete('/users/:id', validateUserId, handleValidationErrors, deleteUser);

export default router;