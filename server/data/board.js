import SQ, { sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;

export const Board = sequelize.define('board', {
  board_idx: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Board.belongsTO(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
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

export async function getAll() {
  return Board.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function create(text, userId) {
  return Board.create({ text, userId }).then((data) => {
    return data;
  });
}
