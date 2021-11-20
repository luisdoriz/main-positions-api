const Organizations = require('../actions/organizations');

exports.getOrganizations = async (req, res) => {
    try {
        const orgs = await Organizations.readOrganizations();
        res.status(200).json({ status: "success", data: orgs });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", error });
    }
};

exports.postOrganization = async (req, res) => {
    try {
        let { name, address, phoneNumber } = req.body;
        await Organizations.createOrganization({ name, address, phoneNumber })
        res.status(201).send({ 'message': 'Organization created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        next(error)
    }
};

exports.putOrganization = async (req, res) => {
    try {
        let { idOrganization } = req.params;
        let { name, address, phoneNumber, isActive } = req.body;
        await Organizations.updateOrganization({ idOrganization, name, address, phoneNumber, isActive, UpdatedBy: req.user.idUser })
        res.status(201).send({ 'message': 'Organization created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        next(error)
    }
};

exports.deleteOrganization = async (req, res) => {
    const { idOrganization } = req.params;
    try {
        await Organizations.deleteOrganization({
            idOrganization
        })
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};


