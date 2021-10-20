const { User } = require('../../models');

const updateUser = async ({ idUser, email, name, idRole, idOrganization }) => {
    return User.update({
        email, name, idRole, idOrganization
    }, {
        where: {
            idUser
        }
    });
}

module.exports = {
    updateUser,
}