const { Beacon } = require('../../models');

const deleteBeacon = async ({ idBeacon }) => {
    await Beacon.destroy({
        where: {
            idBeacon
        }
    });
}

module.exports = {
    deleteBeacon,
}