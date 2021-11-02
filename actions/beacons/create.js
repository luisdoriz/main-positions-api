const { Beacon } = require('../../models');

const createBeacon = async ({ macAddress, idPrivilegeLevel, idFacility, isActive, CreatedBy, UpdatedBy }) => {
    const beacon = await Beacon.findOne({ where: { macAddress } })
    if (beacon) throw 'Beacon already exists'
    return await Beacon.create({
        macAddress, idPrivilegeLevel, idFacility, isActive, CreatedBy, UpdatedBy
    });
}

module.exports = {
    createBeacon
};