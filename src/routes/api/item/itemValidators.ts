import { body, query, header } from 'express-validator/check';
import { exists } from 'fs';
// TODO: Check if items belong to user, JWT stuff etc.
export const newPOSTValidators = [
  body('name')
    .exists()
    .withMessage('Name cannot be empty.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long.'),
  body('description')
    .exists()
    .withMessage('Description cannot be empty.')
    .isLength({ max: 500 })
    .withMessage('Description cannot be longer than 500 characters.'),
  body('price')
    .exists()
    .isFloat({ min: 0.0, max: Number.MAX_VALUE })
    .withMessage('Invalid price. Must be a float and at least 0.')
    .toFloat(),
  body('amount')
    .exists()
    .isInt({ gt: 0, max: 500 })
    .withMessage('Invalid amount. Must be an integer between 1 and 500.')
    .toInt()
];
export const GETValidators = [
  query('_id')
    .exists()
    .withMessage('No _id specified.')
    .isMongoId()
    .withMessage('Invalid _id specified.')
];
export const DELETEValidators = [
  query('_id')
    .exists()
    .withMessage('No _id specified.')
    .isMongoId()
    .withMessage('Invalid _id specified.')
];

export const UPDATEValidators = [
  query('_id')
    .exists()
    .withMessage('No _id specified.')
    .isMongoId()
    .withMessage('Invalid _id specified.'),
  header('Content-Type')
    .equals('application/json')
    .withMessage('must be application/json'),
  body('item')
    .exists()
    .withMessage('No item specified'),
  body('item.name')
    .exists()
    .withMessage('Name cannot be empty.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long.'),
  body('item.description')
    .exists()
    .withMessage('Description cannot be empty.')
    .isLength({ max: 500 })
    .withMessage('Description cannot be longer than 500 characters.'),
  body('item.price')
    .isFloat({ min: 0.0, max: Number.MAX_VALUE })
    .withMessage('Invalid price. Must be a float and at least 0.')
    .toFloat(),
  body('item.amount')
    .isInt({ gt: 0, max: 500 })
    .withMessage('Invalid amount. Must be an integer between 1 and 500.')
    .toInt()
];
