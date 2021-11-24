const { Gateway } = require('../../models');

const updateGateway = async ({idGateway, macAddress, idArea, x, y, isActive, UpdatedBy}) => {
    return Gateway.update({
        macAddress: macAddress.toUpperCase() , idArea, x, y, isActive, UpdatedBy
    }, {
        where: {
            idGateway
        }
    });
}

const updateGatewayArea = async ({idGateway, idArea}) => {
    return Gateway.update({
        idArea
    }, {
        where: {
            idGateway
        }
    });
}

module.exports = {
    updateGateway,
    updateGatewayArea
}