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
    //data from flask
    const { positions } = req.body;
    try {
        for (let position of positions) {
            const { x, y, from, to, area, beacon } = position;
            Positions.upsertPosition({
                x, y, from, to, area, beacon,
                isActive: 1,
                CreatedBy: req.user.idUser,
                UpdatedBy: req.user.idUser
            })
        }
        res.status(200).json({ status: 'success', data: positions.length });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.deletePositions = async (req, res) => {
    return
};


