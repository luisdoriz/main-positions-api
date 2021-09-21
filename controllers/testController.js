const Roles = require('../actions/roles');

exports.getRoles = async (req, res, next) => {
    try {
        console.log('running controller test')
        await Roles.createRole({ name: 'testRole' })
        res.send('<h1> Test route working </h1>');
    } catch (error) {
        res.status(500).send(error);
        next(error);
    }
}