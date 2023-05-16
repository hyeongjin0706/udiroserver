import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/user.js';
import { config } from '../config.js';

export async function signup(req, res) {
  const { user_name, user_id, user_pw, user_email, user_phone, user_area } =
    req.body;

  const hashed = await bcrypt.hash(user_pw, config.bcrypt.saltRound);
  const userId = await userRepository.createUser({
    user_name,
    user_id,
    user_pw: hashed,
    user_email,
    user_phone,
    user_area,
  });
  console.log(userId);
  const token = createJwtToken(userId);
  res.status(201).json({ token, user_id });
}

export async function login(req, res) {
  const { user_id, user_pw } = req.body;
  const user = await userRepository.searchById(user_id);

  if (!user) {
    return res
      .status(401)
      .json({ message: '아이디 또는 비밀번호를 확인하세요' });
  }
  const isValidpassword = await bcrypt.compare(user_pw, user.user_pw);
  if (!isValidpassword) {
    return res
      .status(401)
      .json({ message: '아이디 또는 비밀번호를 확인하세요' });
  }
  const token = createJwtToken(user.user_idx);
  res.status(200).json({ token, user_id });
}

export async function me(req, res, next) {
  const user = await userRepository.searchByIdx(req.user_idx);
  if (!user) {
    return res.status(404).json({ message: '사용자가 존재하지 않습니다.' });
  }
  res.status(200).json({ token: req.token, user_id: user.user_id });
}

function createJwtToken(idx) {
  return jwt.sign({ idx }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
