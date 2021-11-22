const Gateways = require('../actions/gateways');

exports.getGateways = async (req, res) => {
    //gets all existing active gateways
    try {
        const { macAddress } = req.body;
        const gateways = await Gateways.readGateways({ macAddress });
        return res.status(200).send({ status: 'success', data: gateways })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.getGatewaysFacility = async (req, res) => {
    //gets all existing active gateways
    try {
        const { idFacility } = req.params;
        const { idOrganization } = req.user;
        const gateways = await Gateways.readGatewaysByIdFacility({ idFacility, idOrganization });
        return res.status(200).send({ status: 'success', data: gateways })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postGateway = async (req, res) => {
    const { macAddress, idArea, x, y } = req.body;
    try {
        const gateway = await Gateways.createGateway({
            macAddress,
            idArea,
            x, y,
            isActive: 1,
            CreatedBy: req.user.idUser,
            UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: gateway });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putGateway = async (req, res) => {
    try {
        const { idGateway } = req.params;
        const { macAddress, idArea, x, y, isActive } = req.body;
        const gateway = await Gateways.updateGateway({ idGateway, macAddress, idArea, x, y, isActive, UpdatedBy: req.user.idUser });
        return res.status(200).send({ status: 'success', data: gateway })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putGatewayArea = async (req, res) => {
    //updates gateway idArea attribute
    try {
        const { idGateway, idArea } = req.body;
        const gateway = await Gateways.updateGatewayArea({ idGateway, idArea });
        return res.status(200).send({ status: 'success', data: gateway })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.deleteGateway = async (req, res) => {
    const { idGateway } = req.params;
    try {
        await Gateways.deleteGateway({
            idGateway
        })
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};


