const Positions = require('../actions/positions');

exports.getPositions = async (req, res) => {
    return
};

exports.postPositions = async (req, res) => {
    const { x, y, from, to, idArea, idBeacon } = req.body;
    try {
        const position = await Positions.createPosition({
            x, y, from, to, idArea, idBeacon,
            isActive: 1,
            CreatedBy: req.user.idUser,
            UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: position });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};
exports.putPositions = async (req, res) => {
    return
};

exports.deletePositions = async (req, res) => {
    return
};


