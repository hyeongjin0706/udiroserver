import * as boardRepository from '../data/board.js';

export async function getBoards(req, res) {
  const username = req.query.user_name;
  const data = await (username
    ? boardRepository.getAllbyusername(user_name)
    : boardRepository.getAll());
  res.status(200).json(data);
}

export async function getBoard(req, res, next) {
  const id = req.params.board_id;
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
  const id = req.params.user_idx;
  const text = req.body.board_content;
  const board = await boardRepository.getById(user_idx);

  if (!board) {
    res.status(404).json({ message: `board id(${board}) not found` });
  }
  if (board.board_id !== req.board_id) {
    return res.sendStatus(403);
  }
  const updated = await boardRepository.update(board_id, text);
  res.status(200).json(updated);
}

export async function deleteBoard(req, res, next) {
  const boardId = req.params.board_id;
  const board = await boardRepository.getById(boardId);
  if (!board) {
    res.status(404).json({ message: `board id(${boardId}) not found` });
  }
  if (!board.board_id !== req.board_id) {
    return res.sendStatus(403);
  }
  await boardRepository.remove(board);
  res.sendStatus(204);
}
