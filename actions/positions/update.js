const moment = require("moment");
const { Sequelize, Beacon, Position, Person } = require('../../models');
const { Op } = require('sequelize')

const upsertPosition = async ({ x, y, from, to: input_to, area, beacon, isActive, CreatedBy, UpdatedBy }) => {
    //updates or creates position. If beacon was in the same position as before, update existing position row by editing its "from" and "to" values instead of creating a new row
    // console.log(beacon, beacon.toUpperCase())
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
    // console.log('aaa',idBeacon, idPerson, idPrivilegeLevel)
    const previousPosition = await Position.findOne({
        where: {
            idPerson, 
            to: { //only get rows from past 5 minutes. if exist edit their "to" else create new position row
                [Op.gte]: moment(input_to, "YYYY-MM-DD HH:mm:ss.SSS").subtract(5, 'minutes').toDate(),
            }
        },
        order: [['to', 'DESC']], //get latest row 
    })

    let updatePreviousPosition = false
    if(previousPosition) {
        if( (previousPosition.x >= x - 1 && previousPosition.x <= x + 1) &&
            (previousPosition.y >= y - 1 && previousPosition.y <= y + 1)
        ) { //if previousPosition x and y is within 2 meters of new req position
            updatePreviousPosition = true
        }
    }

    if (updatePreviousPosition) {
        //a position within 5 minutes already exists, edit "to"
        
        //check input_to is newer than original to
        if (moment(input_to, "YYYY-MM-DD HH:mm:ss.SSS") <= moment(previousPosition.to)) throw console.log('input_to is older than original to')
        
        console.log('updated position')
        await Position.update({
            to: input_to
        }, {
            where: {
                idPosition: previousPosition.idPosition
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