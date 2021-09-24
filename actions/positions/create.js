const { Position } = require('../../models');

const createPosition = async ({ x, y, from, to, idArea, idBeacon, isActive, CreatedBy, UpdatedBy }) => {
    return Position.create({
        x, y, from, to, idArea, idBeacon, isActive, CreatedBy, UpdatedBy
    })
};

module.exports = {
    createPosition,
};