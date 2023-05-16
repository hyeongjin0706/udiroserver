import express from 'express';
import * as boardController from '../controller/board.js';
import { isAuth } from '../middleware/auth';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateBoard = [
  body('text')
    .trim()
    .isLength({ min: 4 })
    .withMessage('text는 최소 4글자 이상 입력하세요'),
  validate,
];

//GET
// /boards/
router.get('/', isAuth, boardController.getBoards);

//GET
// /boards/:id
// router.get('/:id', isAuth, boardController.getBoard);

//GET
// /boards/:username
// router.get('/:id', isAuth, boardController.getBoard);

//GET
// /boards/:title
// router.get('/:id', isAuth, boardController.getBoard);

// POST!
// create
router.post('/', isAuth, validateBoard, boardController.CreateBoard);

// PUT
// title
// router.put('/:id', isAuth, validateBoard, boardController.UpdateBoard);

// PUT
// content
// router.put('/:id', isAuth, validateBoard, boardController.UpdateBoard);

DELETE
router.delete('/:id', isAuth, boardController.deleteBoard);

export default router;
