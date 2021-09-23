const { Gateway } = require('../../models');

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
    updateGatewayArea
}