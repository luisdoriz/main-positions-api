const moment = require("moment");
const { Sequelize, Beacon, Position, Person } = require('../../models');
const { Op } = require('sequelize')

const upsertPosition = async ({ x, y, from, to: input_to, area, beacon, isActive, CreatedBy, UpdatedBy }) => {
    //updates or creates position. If beacon was in the same position as before, update existing position row by editing its "from" and "to" values instead of creating a new row

    const { idBeacon, idPerson, idPrivilegeLevel } = await Beacon.findOne({
        attributes: [
            'idBeacon',
            [Sequelize.col('Person.idPerson'), 'idPerson'],
            [Sequelize.col('Person.idPrivilegeLevel'), 'idPrivilegeLevel'],
        ],
        include: {
            model: Person,
            attributes: []
        },
        where: {
            macAddress: beacon.toUpperCase() 
        },
        raw: true
    })

    const previousPositions = await Position.findOne({
        where: {
            idPerson, 
            x: {
                [Op.between]: [x - 1, x + 1],   //extend range to 2 meters
            }, 
            y: {
                [Op.between]: [y - 1, y + 1],   //extend range to 2 meters
            },
            to: { //only get rows from past 5 minutes. if exist edit their "to" else create new position row
                [Op.gte]: moment(input_to).subtract(5, 'minutes').toDate(),
            }
        },
        order: [['CreationDate', 'DESC']], //get latest row 
    })

    if (previousPositions) {
        //a position within 5 minutes already exists, edit "to"

        //check input_to is newer than original to
        if (moment(input_to) <= moment(previousPositions.to)) return console.log('input_to is older than original to')

        console.log('edited idPosition', previousPositions.idPosition, "to:", input_to)
        await Position.update({
            to: input_to
        }, {
            where: {
                idPosition: previousPositions.idPosition
            }
        });
    } else {
        //create new position row
        console.log('created new position')
        await Position.create({
            x, y, from, to: input_to, idArea: area, idPerson, isActive, CreatedBy, UpdatedBy
        })
    }
    return { idBeacon, idPerson, idPrivilegeLevel }
}

module.exports = {
    upsertPosition
}