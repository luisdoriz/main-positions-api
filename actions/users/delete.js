const { User } = require('../../models');

const deleteUser = async ({ idUser }) => {
    await User.destroy({
        where: {
            idUser
        }
    });
}

module.exports = {
    deleteUser,
}