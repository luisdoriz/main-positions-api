const Organizations = require('../actions/organizations');

exports.getOrganizations = async (req, res) => {
    return
};

exports.postOrganizations = async (req, res) => {
    try {
        let { name, address, phoneNumber } = req.body;
        await Organizations.createOrganization({ name, address, phoneNumber })
        res.status(200).send({ 'message': 'Organization created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        next(error)
    }};

exports.putOrganizations = async (req, res) => {
    return
};

exports.deleteOrganizations = async (req, res) => {
    return
};


