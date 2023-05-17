import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCulture = [
    body('culture_content')
        .trim()
        .isLength({min : 4})
        .withMessage('text는 최소 4글자 이상 입력하세요!'),
    validate
];

// GET
// /tweets?username=:username
router.get('/', isAuth, cultureController.getCultures);

// GET
// /tweets/:id
router.get('/:id', isAuth, cultureController.getCulture);

// text가 4자 이하인 경우 에러처리
//POST
// id: Date.now().toString()
router.post('/', isAuth, validateTweet, cultureController.CreateCulture);

// PUT
// text만 수정
router.put('/:id', isAuth, validateTweet, cultureController.UpdateCulture);

// DELETE
router.delete('/:id', isAuth, cultureController.deleteCulture);

export default router;