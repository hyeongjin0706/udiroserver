import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/user/user.js";
import {config} from "../config.js";
import {transport} from "../db/email.js"

export async function signup(req, res) {
    const {user_name, user_id, user_pw, user_email, user_phone, user_area}  = req.body;

    const hashed = await(bcrypt.hash(user_pw, config.bcrypt.saltRound));
    const userId = await(userRepository.createUser({
        user_name,
        user_id,
        user_pw: hashed,
        user_email,
        user_phone,
        user_area
    }));
    console.log(userId);
    const token = createJwtToken(userId);
    res.status(201).json({token, user_id});
}

export async function login(req, res) {
    const {user_id, user_pw} = req.body;
    const user = await(userRepository.searchById(user_id));

    if (!user) {
        return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"})
    }
    const isValidpassword = await(bcrypt.compare(user_pw, user.user_pw));
    if (!isValidpassword) {
        return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"})
    }
    const token = createJwtToken(user.user_idx);
    res.status(200).json({token, user_id});
}

export async function findId(req, res, next) {
    const {user_name, user_phone} = req.body;
    const user = await(userRepository.searchByNameHP(user_name, user_phone));
    if(!user){
        return res.status(404).json({message: "사용자가 존재하지 않습니다."})
    }
    console.log(user.user_name);
    
    await transport.sendMail({
        from: 'udiro1111@naver.com',
        to: user.user_email,
        subject: 'UDiro 아이디 찾기',
        text: `${user.user_name}님의 아이디는 [${user.user_id}]입니다.`
    })
    const message = `${user.user_name}님의 메일로 아이디가 발송되었습니다!`;
    return res.status(200).json({message});
}

export async function findPw(req, res, next) {
    const {user_id, user_phone} = req.body;
    const user = await(userRepository.searchByIdHP(user_id, user_phone));
    if(!user){
        return res.status(404).json({message: "사용자가 존재하지 않습니다."})
    }
    const password = getRandomPW();

    await transport.sendMail({
        from: 'udiro1111@naver.com',
        to: user.user_email,
        subject: 'Message',
        text: `${user.user_name}님의 새롭게 설정한 비밀번호는 [${password}]입니다.`
    });

    const hashed = await(bcrypt.hash(password, config.bcrypt.saltRound));

    const message = `${user.user_name}님의 메일로 새롭게 설정한 비밀번호가 발송되었습니다!`;
    return res.status(200).json({message});
}

export async function updatePw(req, res, next) {
    const user = await(userRepository.searchByIdHP(user_id, user_phone));
    if(!user){
        return res.status(404).json({message: "사용자가 존재하지 않습니다."})
    }

    res.status(200).json({token:req.token, user_id: user.user_id});
}

export async function me(req, res, next) {
    const user = await(userRepository.searchByIdx(req.user_idx));
    if(!user){
        return res.status(404).json({message: "사용자가 존재하지 않습니다."})
    }
    res.status(200).json({token:req.token, user_id: user.user_id});
}

function getRandomPW() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }
    
    return password;
}

function createJwtToken(idx) {
    return jwt.sign({idx}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec});
}