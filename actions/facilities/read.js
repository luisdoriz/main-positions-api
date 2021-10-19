const models = require('../../models');

const { Facility } = models;

const readFacilities = async () => {
    return Facility.findAll({
        where: {
            isActive: 1
        }
    });

}

module.exports = {
    readFacilities
};