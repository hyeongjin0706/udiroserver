import express from "express";
import * as c_placeController from '../controller/c_place.js';
// import * as c_festaController from '../controller/c_festa.js';
// import { body } from 'express-validator';
// import { validate } from "../middleware/validator.js";
// import { isAuth } from "../middleware/auth.js";

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
router.get('/', c_placeController.getPlaces);

// GET
// /tweets/:id
router.get('/:place_NUM', c_placeController.getPlace);

// text가 4자 이하인 경우 에러처리
//POST
// id: Date.now().toString()
router.post('/', c_placeController.CreatePlace);

// PUT
router.put('/:place_NUM', c_placeController.UpdatePlace);

// DELETE
router.delete('/:place_NUM', c_placeController.deletePlace);

export default router;