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
    const place_NUM = req.params.place_NUM;
    const culture = await cultureRepository.getByPK(place_NUM);
    if (culture) {
        res.status(200).json(culture);
    } else {
        res.status(404).json({ message: `place_NUM(${place_NUM}) not found` });
    }
};

// 수정
export async function Createculture(req, res, next) {
    const { AIRPORT } = req.body;
    console.log(AIRPORT)
    const culture = await cultureRepository.create(AIRPORT);
    console.log(culture)
    res.status(201).json(culture);
};

// 수정
export async function Updateculture(req, res, next) {
    const place_NUM = req.params.place_NUM;
    const { AIRPORT } = req.body;
    const culture = await cultureRepository.getByPK(place_NUM);
    // update 와 delete 에 특정토큰만 접근가능하게 만들기
    if (!culture) {
        res.status(404).json({ message: `place_NUM(${place_NUM})not found` })
    }
    const updated = await cultureRepository.update(place_NUM, AIRPORT);
    res.status(200).json(updated);
}

// 수정
export async function deleteCulture(req, res, next) {
    const place_NUM = req.params.place_NUM;
    const culture = await cultureRepository.getByPK(place_NUM);
    if (!culture) {
        res.status(404).json({ message: `place_NUM(${place_NUM}) not found` });
    }
    await cultureRepository.remove(place_NUM);
    res.sendStatus(204);
};