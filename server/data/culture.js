// import { db } from '../db/database.js';
import SQ, { Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;

// 수정
export const Culture = sequelize.define(
    'culture',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }
);

Culture.belongsTo(User);

// 수정
const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url'],
    ],
    include: {
        model: User,
        attributes: [],
    }
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
};

export async function getAll() {
    return Culture.findAll({ ...INCLUDE_USER, ...ORDER_DESC })

};

// 수정
export async function getAllByUsername(username) {
    return Culture.findAll({
        ...INCLUDE_USER,
        ...ORDER_DESC,
        include: {
            ...INCLUDE_USER.include,
            where: {
                username
            }
        }
    });
}

// 수정
export async function getById(id) {
    return Culture.findOne({
        where: {id},
        ...INCLUDE_USER
    })
}

// 수정
export async function create(text, userId) {
    return Culture.create({text, userId})
        .then((data) => {
            return data;
        });
}

// 수정
export async function update(id, text) {
    return Culture.findByPk(id, INCLUDE_USER)
        .then((Culture) => {
            Culture.text = text;
            return Culture.save();
        });
}

// 수정
export async function remove(id) {
    return Culture.findByPk(id)
        .then((Culture) => {
            Culture.destroy();
        })
}