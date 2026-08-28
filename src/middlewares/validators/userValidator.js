import { body, param } from 'express-validator';
import { User } from '../../models/index.js';

export const validateUserId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('El usuario no existe');
      }
      return true;
    })
];

export const validateCreateUser = [
  body('username')
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres')
    .custom(async (value) => {
      const existing = await User.findOne({ where: { username: value } });
      if (existing) {
        throw new Error('Ese username ya está en uso');
      }
      return true;
    }),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(async (value) => {
      const existing = await User.findOne({ where: { email: value } });
      if (existing) {
        throw new Error('Ese email ya está registrado');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

export const validateUpdateUser = [
  ...validateUserId,
  body('username')
    .optional()
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres'),
  body('email')
    .optional()
    .isEmail().withMessage('Debe ser un email válido')
];