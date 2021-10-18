const { Case } = require('../../models');

const deleteCase = async ({ idCase }) => {
    await Case.destroy({
        where: {
            idCase
        }
    });
}

module.exports = {
    deleteCase,
}