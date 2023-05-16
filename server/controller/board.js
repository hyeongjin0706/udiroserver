import * as boardRepository from '../data/board.js';

export async function getBoards(req, res) {
  const username = req.query.username;
  const data = await (username
    ? boardRepository.getAllbyusername(username)
    : boardRepository.getAll());
  res.status(200).json(data);
}

export async function getBoard(req, res, next) {
  const id = req.params.id;
  const board = await boardRepository.getById(id);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).json({ message: `Board id(${id}) not found` });
  }
}

export async function CreateBoard(req, res, next) {
  const { content } = req.body;
  const board = await boardRepository.create(content, req.user_idx);
  res.status(201).json(board);
}

export async function UpdateBoard(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const board = await boardRepository.getById(id);

  if (!board) {
    res.status(404).json({ message: `board id(${id}) not found` });
  }
  if (board.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await boardRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteBoard(req, res, next) {
  const id = req.params.id;
  const board = await boardRepository.getById(id);
  if (!board) {
    res.status(404).json({ message: `board id(${id}) not found` });
  }
  if (!board.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await boardRepository.remove(id);
  res.sendStatus(204);
}
