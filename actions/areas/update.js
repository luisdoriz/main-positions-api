const { Area, AreaEdge, Edge, Vertex } = require('../../models');

const updateArea = async ({ idArea, name, timeLimit, maxCapacity, idFacility, isActive, UpdatedBy }) => {
    return Area.update({
        name, timeLimit, maxCapacity, idFacility, isActive, UpdatedBy
    }, {
        where: {
            idArea
        }
    });
}
const updateAreaEdge = async ({ idAreaEdge, idEdge, idArea, isActive, UpdatedBy }) => {
    return AreaEdge.update({
        idEdge, idArea, isActive, UpdatedBy
    }, {
        where: {
            idAreaEdge
        }
    });
}
const updateEdge = async ({ idEdge, root, target, isActive, UpdatedBy }) => {
    return Edge.update({
        root, target, isActive, UpdatedBy
    }, {
        where: {
            idEdge
        }
    });
}
const updateVertex = async ({ idVertex, x, y, isActive, UpdatedBy }) => {
    return Vertex.update({
        x, y, isActive, UpdatedBy
    }, {
        where: {
            idVertex
        }
    });
}

module.exports = {
    updateArea,
    updateAreaEdge,
    updateEdge,
    updateVertex
}