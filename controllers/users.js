const bcrypt = require('bcryptjs');

const Users = require('../actions/users');

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await Users.login({email, password});
        res.status(200).json({ status: 'success', data: { token } });
    } catch {
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
};

//********************************USERS****************************************
exports.getUser = async (req, res) => {
    return res.status(200).json({ status: 'success', data: req.body.user });
};

exports.postUser = async (req, res) => {
    const { email, name, password, idRole, idOrganization } = req.body;
    try {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {// email regex validator w3resource
            return res.status(400).send({ status: 'error', message: 'Invalid email address' });
        }
        const emailExists = await Users.userEmailExists(email);
        if (emailExists) {
            res.status(409).json({ status: 'error', message: 'There is already an account with that email provided.' });
        } else {
            const hash = bcrypt.hashSync(password, 10);
            const user = await Users.createUser({
                email,
                name,
                password: hash,
                idRole,
                idOrganization
            });
            res.status(201).json({ status: 'success', data: user });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putUser = async (req, res) => {
    return
};

exports.deleteUser = async (req, res) => {
    return
};