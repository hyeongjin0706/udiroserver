import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './user.js';
import { Board } from './board.js';

const DataTypes = SQ.DataTypes;

// export const User = sequelize.define(
//     'user',
//     {

//     }
// )