const models = require('../../models');

const { User, Organization, Role } = models;

const readUsers = async ({ idOrganization }) => {
  const users = await User.findAll({
    where: { idOrganization },
    include: { model: Role }
  })
  const formatedUsers = []
  users.forEach(u => formatedUsers.push({
    idUser: u.idUser,
    name: u.name,
    //lastNames: `${u.firstLastName} ${u.secondLastName}`,
    email: u.email,
    roleName: u.Role.name,
    idRole: u.Role.idRole
  }))
  return formatedUsers
};

const userEmailExists = async (email) => User.count({ where: { email } });

const getUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
  include: {
    model: Organization
  }
});

module.exports = {
  readUsers,
  getUserByEmail,
  userEmailExists,
};