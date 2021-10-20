const bcrypt = require('bcryptjs');

const Users = require('../actions/users');
const Roles = require('../actions/roles');

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await Users.login({ email, password });
        res.status(200).json({ status: 'success', data: { token } });
    } catch {
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Roles.readRoles();
        res.status(200).json({ status: 'success', data: { roles } });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
};

//********************************USERS****************************************
exports.getUser = async (req, res) => {
    try {
        const { idUser } = req.user
        const user = await Users.readUser({ idUser });
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { idOrganization } = req.user
        const users = await Users.readUsers({ idOrganization });
        res.status(200).json({ status: 'success', data: { users } });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
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
    try {
        const { idUser } = req.params;
        const { email, name, password, idRole, idOrganization } = req.body;
        const updatedUser = await Users.updateUser({ idUser, email, name, password, idRole, idOrganization });
        res.status(200).json({ status: 'success', data: { updatedUser } });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error: 'Check the email address or password.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await Users.deleteUser({ idUser })
        res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};