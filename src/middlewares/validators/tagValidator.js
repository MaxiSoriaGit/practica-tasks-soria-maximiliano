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

export const createTagValidator = [

  body('name')

    .notEmpty().withMessage('El nombre del tag es obligatorio')

    .isString().withMessage('El nombre debe ser un texto'),

];

export const updateTagValidator = [

  body('name')

    .optional()

    .isString().withMessage('El nombre debe ser un texto')

    .notEmpty().withMessage('El nombre no puede quedar vacío'),

];