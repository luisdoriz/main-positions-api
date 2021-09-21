const Gateways = require('../actions/gateways');

exports.getGateways = async (req, res) => {
    return
};

exports.postGateways = async (req, res) => {
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
exports.putGateways = async (req, res) => {
    return
};

exports.deleteGateways = async (req, res) => {
    return
};


