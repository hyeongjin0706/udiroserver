import * as c_placeRepository from '../data/c_place.js';
// import * as c_placeRepository from '../data/c_festa.js';

// 수정
export async function getPlaces(req, res) {
    const username = req.query.username;
    const data = await (username
        ? c_placeRepository.getAllByUsername(username)
        : c_placeRepository.getAll());
    res.status(200).json(data);
};

// 수정
export async function getPlace(req, res, next) {
    const place_NUM = req.params.place_NUM;
    const culture = await c_placeRepository.getByPK(place_NUM);
    if (culture) {
        res.status(200).json(culture);
    } else {
        res.status(404).json({ message: `place_NUM(${place_NUM}) not found` });
    }
};

// 수정
export async function CreatePlace(req, res, next) {
    const { AIRPORT } = req.body;
    console.log(AIRPORT)
    const culture = await c_placeRepository.create(AIRPORT);
    console.log(culture)
    res.status(201).json(culture);
};

// 수정
export async function UpdatePlace(req, res, next) {
    const place_NUM = req.params.place_NUM;
    const { AIRPORT } = req.body;
    const culture = await c_placeRepository.getByPK(place_NUM);
    // update 와 delete 에 특정토큰만 접근가능하게 만들기
    if (!culture) {
        res.status(404).json({ message: `place_NUM(${place_NUM})not found` })
    }
    const updated = await c_placeRepository.update(place_NUM, AIRPORT);
    res.status(200).json(updated);
}

// 수정
export async function deletePlace(req, res, next) {
    const place_NUM = req.params.place_NUM;
    const culture = await c_placeRepository.getByPK(place_NUM);
    if (!culture) {
        res.status(404).json({ message: `place_NUM(${place_NUM}) not found` });
    }
    await c_placeRepository.remove(place_NUM);
    res.sendStatus(204);
};