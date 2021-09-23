const Areas = require('../actions/areas');
const AreaAccess = require('../actions/areaAccess');
const AreaEdges = require('../actions/areaEdge');
const Edges = require('../actions/edges');
const Vertex = require('../actions/vertex');

exports.getArea = async (req, res) => {
    return
};

exports.getAreaAll = async (req, res) => {
    const areas = await Areas.readAreasAll();
    return res.status(200).send({ status: 'success', data: areas })
};

exports.postArea = async (req, res) => {
    const { name, timeLimit, maxCapacity, idFacility } = req.body;
    try {
        const gateway = await Areas.createArea({
            name, timeLimit, maxCapacity, idFacility, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: gateway });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postAreaEdge = async (req, res) => {
    const { idEdge, idArea } = req.body;
    try {
        const gateway = await Areas.createAreaEdge({
            idEdge, idArea, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: gateway });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postEdge = async (req, res) => {
    const { root, target } = req.body;
    try {
        const gateway = await Areas.createEdge({
            root, target, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: gateway });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.postVertex = async (req, res) => {
    const { x, y } = req.body;
    try {
        const gateway = await Areas.createVertex({
            x, y, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: gateway });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putArea = async (req, res) => {
    return
};

exports.deleteArea = async (req, res) => {
    return
};


