const { Alert } = require('../../models');

const deleteAlert = async ({ idAlert }) => {
    await Alert.destroy({
        where: {
            idAlert
        }
    });
}

module.exports = {
    deleteAlert,
}