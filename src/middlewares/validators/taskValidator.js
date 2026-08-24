import { body, param } from 'express-validator';
import { Task, User } from '../../models/index.js';

export const validateTaskId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error('La tarea no existe');
      }
      return true;
    })
];

export const validateCreateTask = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),

  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),

  body('userId')
    .notEmpty().withMessage('El userId es obligatorio')
    .isInt({ min: 1 }).withMessage('El userId debe ser un entero positivo')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('El usuario asociado no existe');
      }
      return true;
    }),

  // validación custom propia del modelo Task
  body('completed')
    .optional()
    .isBoolean().withMessage('El campo completed debe ser true o false')
];

export const validateUpdateTask = [
  ...validateTaskId,
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
  body('completed')
    .optional()
    .isBoolean().withMessage('El campo completed debe ser true o false')
];