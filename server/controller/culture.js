import * as cultureRepository from '../data/culture.js';

// 수정
export async function getCultures(req, res) {
    const username = req.query.username;
    const data = await (username
        ? cultureRepository.getAllByUsername(username)
        : cultureRepository.getAll());
    res.status(200).json(data);
};

// 수정
export async function getCulture(req, res, next) {
    const id = req.params.id;
    const culture = await cultureRepository.getById(id);
    if (culture) {
        res.status(200).json(culture);
    } else {
        res.status(404).json({ message: `Culture id(${id}) not found` });
    }
};

// 수정
export async function Createculture(req, res, next) {
    const { text } = req.body;
    const culture = await cultureRepository.create(text, req.userId);
    res.status(201).json(culture);
};

// 수정
export async function Updateculture(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const culture = await cultureRepository.getById(id);
    // update 와 delete 에 특정토큰만 접근가능하게 만들기
    if (!culture) {
        res.status(404).json({ message: `culture id(${id})not found` })
    }
    if (culture.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updated = await cultureRepository.update(id, text);
    res.status(200).json(updated);
}

// 수정
export async function deleteCulture(req, res, next) {
    const id = req.params.id;
    const culture = await cultureRepository.getById(id);
    if (!culture) {
        res.status(404).json({ message: `culture id(${id}) not found` });
    }
    if (culture.userId !== req.userId) {
        return res.sendStatus(403);
    }
    await cultureRepository.remove(id);
    res.sendStatus(204);
};