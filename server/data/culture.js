// import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

// 수정
export const Culture = sequelize.define(
    'culture_place',
    {
        place_NUM: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        SUBJCODE: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        FAC_NAME: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        ADDR: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        X_COORD: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        Y_COORD: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        PHNE: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FAX: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        HOMEPAGE: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        OPENHOUR: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ENTR_FEE: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        CLOSEDAY: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        OPEN_DAY: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        SEAT_CNT: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        MAIN_IMG: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        ETC_DESC: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        FAC_DESC: {
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        ENTRFREE: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        SUBWAY: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        BUSSTOP: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        YELLOW: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        GREEN: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        BLUE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        RED: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        AIRPORT: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);

console.log(Culture);

// 수정
const ORDER_DESC = {
    order: [['place_NUM', 'DESC']]
};

// export async function getAll() {
//     return Culture.findAll({ ...INCLUDE_USER, ...ORDER_DESC })

// };

// // 수정
// export async function getAllByUsername(username) {
//     return Culture.findAll({
//         ...INCLUDE_USER,
//         ...ORDER_DESC,
//         include: {
//             ...INCLUDE_USER.include,
//             where: {
//                 username
//             }
//         }
//     });
// }

// // 수정
// export async function getById(id) {
//     return Culture.findOne({
//         where: { id },
//         ...INCLUDE_USER
//     })
// }

// // 수정
// export async function create(text, userId) {
//     return Culture.create({ text, userId })
//         .then((data) => {
//             return data;
//         });
// }

// // 수정
// export async function update(id, text) {
//     return Culture.findByPk(id, INCLUDE_USER)
//         .then((Culture) => {
//             Culture.text = text;
//             return Culture.save();
//         });
// }

// // 수정
// export async function remove(id) {
//     return Culture.findByPk(id)
//         .then((Culture) => {
//             Culture.destroy();
//         })
// }