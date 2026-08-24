import { body, param } from 'express-validator';
import { Tag } from '../../models/index.js';

export const validateTagId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    .custom(async (value) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error('El tag no existe');
      }
      return true;
    })
];

export const validateCreateTag = [
  body('name')
    .notEmpty().withMessage('El nombre del tag es obligatorio')
    .isLength({ min: 2, max: 20 }).withMessage('El nombre debe tener entre 2 y 20 caracteres')
    .custom(async (value) => {
      const existing = await Tag.findOne({ where: { name: value } });
      if (existing) {
        throw new Error('Ese tag ya existe');
      }
      return true;
    })
];