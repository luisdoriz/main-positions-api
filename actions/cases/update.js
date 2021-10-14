const { Case } = require('../../models');

const updateCase = async ({ idCase, to, ongoing }) => {
    return Case.update({
        to, ongoing
    }, {
        where: {
            idCase
        }
    });
}

module.exports = {
    updateCase
}