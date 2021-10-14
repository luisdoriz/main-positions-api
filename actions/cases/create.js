const { Case } = require('../../models');

const createCase = async ({ from, to, ongoing, idPerson, isActive, CreatedBy, UpdatedBy }) => Case.create({
    from, to, ongoing, idPerson, isActive, CreatedBy, UpdatedBy
});

module.exports = {
    createCase
};