const models = require('../../models');

const { User, Organization, Role } = models;

const readUsers = async ({ idOrganization }) => {
  //gets all users in an organization
  const users = await User.findAll({
    where: { idOrganization },
    include: { model: Role, where: { idRole: [3, 4] } }
  })
  const formatedUsers = []
  users.forEach(u => formatedUsers.push({
    idUser: u.idUser,
    name: u.name,
    email: u.email,
    roleName: u.Role.name,
    idRole: u.Role.idRole
  }))
  return formatedUsers
};

const readUser = async ({ idUser }) => {
  //gets single user
  const u = await User.findOne({
    where: { idUser },
    include: { model: Role }
  })
  return {
    idUser: u.idUser,
    name: u.name,
    email: u.email,
    roleName: u.Role.name,
    idRole: u.Role.idRole
  }
};

const readAdmins = async ({ idOrganization }) => {
  //gets admins
  return User.findAll({
    attributes: ['idUser', 'name', 'email'],
    include: { model: Role, where: { idRole: 2 }, attributes: [] },
    where: { idOrganization }
  })
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
  readUser,
  getUserByEmail,
  userEmailExists,
  readAdmins
};