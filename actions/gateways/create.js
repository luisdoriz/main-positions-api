const { Gateway } = require('../../models');

const createGateway = async ({ macAddress, idArea, x, y, isActive, CreatedBy, UpdatedBy }) => {
    const gateway = await Gateway.findOne({ where: { macAddress: macAddress.toUpperCase() , x, y } })
    if (gateway) throw 'Gateway already registered'
    return await Gateway.create({
        macAddress: macAddress.toUpperCase() ,
        idArea,
        x,
        y,
        isActive,
        CreatedBy,
        UpdatedBy,
    });
}


module.exports = {
    createGateway
};