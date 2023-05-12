import express from "express";
import * as tweetController from '../controller/tweet.js'
import {body} from 'express-validator';

const router = express.Router();

const validateTweet = [
    body("text").trim().isLength({min:4}).withMessage("text는 최소 4자 이상 입력하세요!"),
    validate
];

router.post('/siginup', tweetController.getTweets);

export default router;