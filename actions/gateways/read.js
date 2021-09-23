const models = require('../../models');

const { Gateway, Area } = models;

const readGateways = async () => {
    return Gateway.findAll({
        include: [{
            model: Area
        }],
        where: {
            isActive: 1
        }
    });

}

module.exports = {
    readGateways
};