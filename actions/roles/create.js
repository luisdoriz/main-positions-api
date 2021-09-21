
const { Role } = require('../../models');

const createRole = ({ name }) => {
    return Role.create({ 
        name
    });
}

module.exports = {
    createRole
}
