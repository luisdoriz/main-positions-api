const moment = require("moment");
const { Op,  } = require('sequelize')
const { sequelize, Position } = require("../../models");

const readPositionsPerson24h = async ({ idPerson, area, from, to }) => {
    return Position.findAll({
        where: {
            idPerson,
            from: { //only get rows from past 24 hours
                [Op.gte]: moment(to).subtract(24, 'hours').toDate(),
            }
        },
        order: [
            ['from', 'ASC'],
        ],
        raw: true
    })
};

const readPersonsPositionsArea = async ({ area, to }) => {
    return Position.count({

        where: {
            idArea: area,
            to: { //only get rows from past 5 minutes. if exist edit their "to" else create new position row
                [Op.gte]: moment(to).subtract(5, 'minutes').toDate(),
            }
        },
        distinct:true, 
        col: 'idPerson',        
        raw: true
    })
};

module.exports = {
    readPositionsPerson24h,
    readPersonsPositionsArea
};
