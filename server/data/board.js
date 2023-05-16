import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './user.js';

const DataTypes = SQ.DataTypes;

// 'board' 모델 정의
export const Board = sequelize.define(
  'board',
  {
    board_idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    board_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    board_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    board_likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    board_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    board_views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    board_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }
);

// 'Board' 모델과 'User' 모델 간의 관계 설정
Board.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'board_idx',
    'board_content',
    'createdAt',
    'board_id',
    [sequelize.col('user.user_name'), 'user_name'],
    [sequelize.col('user.user_id'), 'user_id'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

// 모든 게시글 조회
// 모든 게시글을 조회하여 리턴합니다. 
// 게시글 작성자의 이름과 아이디도 같이 리턴합니다.
export async function getAll() {
  return Board.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

// 게시글 생성
// board_title, board_content, board_category 정보와 함께, 현재 접속한 사용자의 정보(user_id)를 바탕으로 새로운 게시글을 작성합니다.
export async function create(board_title, board_content, board_category, user_id) {
  return Board.create({ board_title, board_content, board_category, user_id }).then((data) => {
    return data;
  });
}

// 게시글 수정
// 입력된 board_idx의 게시글의 내용(board_title, board_content, board_category)을 수정합니다.
export async function update(board_idx, board_title, board_content, board_category) {
  return Board.update({ board_title, board_content, board_category }, { where: { board_idx } });
}

// 게시글 삭제
// 입력된 board_idx의 게시글을 삭제합니다.
export async function deleteBoard(board_idx) {
  return Board.destroy({ where: { board_idx } });
}
