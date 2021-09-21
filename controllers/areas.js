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
    return
};

exports.putArea = async (req, res) => {
    return
};

exports.deleteArea = async (req, res) => {
    return
};


