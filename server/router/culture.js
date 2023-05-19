import express from "express";
import * as cultureController from '../controller/culture.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// const validateCulture = [
//     body('culture_content')
//         .trim()
//         .isLength({min : 4})
//         .withMessage('text는 최소 4글자 이상 입력하세요!'),
//     validate
// ];

// GET
// /tweets?username=:username
router.get('/', cultureController.getCultures);

// GET
// /tweets/:id
router.get('/:id', cultureController.getCulture);

// text가 4자 이하인 경우 에러처리
//POST
// id: Date.now().toString()
router.post('/', cultureController.Createculture);

// PUT
router.put('/:place_NUM', cultureController.Updateculture);

// DELETE
router.delete('/:place_NUM', cultureController.deleteCulture);

export default router;