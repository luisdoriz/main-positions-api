const { Gateway } = require('../../models');

const deleteGateway = async ({ idGateway }) => {
    await Gateway.destroy({
        where: {
            idGateway
        }
    });
}

module.exports = {
    deleteGateway,
}