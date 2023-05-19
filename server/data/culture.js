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
            allowNull: true,
        },
        ADDR: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        X_COORD: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        Y_COORD: {
            type: DataTypes.STRING(1000),
            allowNull: true,
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
            allowNull: true,
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
            allowNull: true,
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
            allowNull: false,
        }
    }
);

// 수정
const ORDER_DESC = {
    order: [['place_NUM', 'DESC']]
};

export async function getAll() {
    return Culture.findAll({ ...ORDER_DESC })
};

// 수정 -> 필터 포함 시 날짜, 지역, 카테고리로 검색이므로 3가지가 필요
// export async function getAllByData(username) {
//     return Culture.findAll({
//         ...ORDER_DESC,
//         where: {
//             username
//         }
//     });
// }


// export async function getAllByLocation(username) {
//     return Culture.findAll({
//         ...ORDER_DESC,
//         where: {
//             username
//         }
//     });
// }

// export async function getAllByCategory(username) {
//     return Culture.findAll({
//         ...ORDER_DESC,
//         where: {
//             username
//         }
//     });
// }

// export async function getAllByTitle(username) {
//     return Culture.findAll({
//         ...ORDER_DESC,
//         where: {
//             username
//         }
//     });
// }

// export async function getAllBy(username) {
//     return Culture.findAll({
//         ...ORDER_DESC,
//         where: {
//             username
//         }
//     });
// }

// 바꿀려면 변수 값만 수정하면 됩니다
export async function getByPK(place_NUM) {
    return Culture.findByPk(place_NUM)
}

// 변수 값만 수정하면 됩니다
export async function create(AIRPORT) {
    return Culture.create({ AIRPORT })
        .then((data) => {
            return data;
        });
}

// 찾는 방법 : place_NUM , 바꿀 내용 : AIRPORT -> 변수 값만 수정하면 됩니다
export async function update(place_NUM, AIRPORT) {
    return Culture.findByPk(place_NUM)
        .then((data) => {
            data.AIRPORT = AIRPORT;
            return data.save();
        });
};

// 수정
export async function remove(place_NUM) {
    return Culture.findByPk(place_NUM)
        .then((data) => {
            data.destroy();
        })
}