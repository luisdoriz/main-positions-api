const models = require('../../models');

const { User, Organization } = models;

const getUsers = async () => User.findAll();

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
  getUsers,
  getUserByEmail,
  userEmailExists,
};