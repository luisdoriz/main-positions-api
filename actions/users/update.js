const { User } = require('../../models');

const updateUser = async ({ idUser, email, name, password, idRole, idOrganization }) => {
    return User.update({
        email, name, password, idRole, idOrganization
    }, {
        where: {
            idUser
        }
    });
}

module.exports = {
    updateUser,
}