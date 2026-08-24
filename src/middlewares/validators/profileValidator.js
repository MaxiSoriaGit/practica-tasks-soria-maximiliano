import { body, param } from 'express-validator';
import { Profile, User } from '../../models/index.js';

export const validateProfileId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    .custom(async (value) => {
      const profile = await Profile.findByPk(value);
      if (!profile) {
        throw new Error('El perfil no existe');
      }
      return true;
    })
];

export const validateCreateProfile = [
  body('bio')
    .optional()
    .isLength({ max: 300 }).withMessage('La bio no puede superar los 300 caracteres'),

  body('userId')
    .notEmpty().withMessage('El userId es obligatorio')
    .isInt({ min: 1 }).withMessage('El userId debe ser un entero positivo')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('El usuario asociado no existe');
      }
      const existingProfile = await Profile.findOne({ where: { userId: value } });
      if (existingProfile) {
        // custom propia de Profile: como es 1:1, no puede haber 2 perfiles para el mismo user
        throw new Error('Este usuario ya tiene un perfil creado');
      }
      return true;
    })
];