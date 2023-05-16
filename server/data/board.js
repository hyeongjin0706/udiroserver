import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './user.js';

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

let User;

(async () => {
  User = await import('./user.js');

Board.belongsTo(User, { foreignKey: 'user_idx'});
User.hasMany(Board, { foreignKey: 'user_idx'});
})();

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

export async function getAll() {
  return Board.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function create(text, user_id) {
  return Board.create({ text, user_id }).then((data) => {
    return data;
  });
}

// export async function update(text, user_id)