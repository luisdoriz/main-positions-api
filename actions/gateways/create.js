const { Gateway } = require('../../models');

const createGateway = async ({ macAddress, idArea, x, y, isActive, CreatedBy, UpdatedBy }) => Gateway.create({
    macAddress, 
    idArea, 
    x, 
    y,
    isActive, 
    CreatedBy,
    UpdatedBy,
});

module.exports = {
    createGateway
};