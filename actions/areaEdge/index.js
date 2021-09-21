const CREATE = require('./create');
const READ = require('./read');
const UPDATE = require('./update');
const DELETE = require('./delete');

module.exports = {
  ...CREATE,
  ...READ,
  ...UPDATE,
  ...DELETE
};
