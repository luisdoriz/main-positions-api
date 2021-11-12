const Areas = require('../actions/areas');

exports.getArea = async (req, res) => {
    return
};

exports.getAreaBeacon = async (req, res) => {
    //gets areas in facilities a beacon is registered at
    const { macAddress } = req.body;
    try {
        const areas = await Areas.readAreasBeacon({ macAddress });
        return res.status(200).send({ status: 'success', data: areas })
    } catch (error) {
        res.status(400).json({ status: 'error', error });
    }
};

exports.getAreaAll = async (req, res) => {
    const areas = await Areas.readAreasAll();
    return res.status(200).send({ status: 'success', data: areas })
};

exports.postArea = async (req, res) => {
    const { area, vertices } = req.body;
    const { idOrganization } = req.user;
    //const { name, timeLimit, maxCapacity, idFacility } = req.body;
    try {
        //TODO check if creator is from same organization


        const nArea = await Areas.createArea({
            area, vertices, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(201).json({ status: 'success', data: nArea });

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
    const { idArea } = req.params
    const { name, timeLimit, maxCapacity, idFacility, isActive } = req.body;
    try {
        const area = await Areas.updateArea({
            idArea, name, timeLimit, maxCapacity, idFacility, isActive, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: area });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putAreaEdge = async (req, res) => {
    const { idAreaEdge, idEdge, idArea, isActive } = req.body;
    try {
        const areaEdge = await Areas.updateAreaEdge({
            idAreaEdge, idEdge, idArea, isActive, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: areaEdge });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putEdge = async (req, res) => {
    const { idEdge, root, target, isActive } = req.body;
    try {
        const edge = await Areas.updateEdge({
            idEdge, root, target, isActive, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: edge });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.putVertex = async (req, res) => {
    const { idVertex, x, y, isActive } = req.body;
    try {
        const vertex = await Areas.updateVertex({
            idVertex, x, y, isActive, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: vertex });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.deleteArea = async (req, res) => {
    const { idArea } = req.params;
    try {
        await Areas.deleteArea({
            idArea
        })
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};

exports.getPrivilegeLevels = async (req, res) => {
    const areas = await Areas.readPrivilegeLevels();
    return res.status(200).send({ status: 'success', data: areas })
};

exports.postPrivilegeLevel = async (req, res) => {
    const { name } = req.body;
    try {
        const privilegeLevel = await Areas.createPrivilegeLevel({
            name, isActive: 1, CreatedBy: req.user.idUser, UpdatedBy: req.user.idUser
        })
        res.status(200).json({ status: 'success', data: privilegeLevel });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', error });
    }
};