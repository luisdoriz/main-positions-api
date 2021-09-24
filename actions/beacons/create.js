const { Beacon } = require('../../models');

const createBeacon = async ({ macAddress, idPrivilegeLevel, isActive, CreatedBy, UpdatedBy }) => Beacon.create({
    macAddress, idPrivilegeLevel, isActive, CreatedBy, UpdatedBy
});

module.exports = {
    createBeacon
};