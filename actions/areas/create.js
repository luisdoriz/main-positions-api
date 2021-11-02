const { Area, AreaEdge, Edge, Vertex, PrivilegeLevel } = require('../../models');

const createArea = async ({ area, vertices, isActive, CreatedBy, UpdatedBy }) => {
    // await Area.create({
    //     name: area.name,
    //     timeLimit: area.timeLimit,
    //     maxCapacity: area.maxCapacity,
    //     idFacility: area.idFacility,
    //     isActive,
    //     CreatedBy,
    //     UpdatedBy,
    // })

    vertices.forEach(vertex => {

    })
};

const createAreaEdge = async ({ idEdge, idArea, isActive, CreatedBy, UpdatedBy }) => AreaEdge.create({
    idEdge,
    idArea,
    isActive,
    CreatedBy,
    UpdatedBy,
});

const createEdge = async ({ root, target, isActive, CreatedBy, UpdatedBy }) => Edge.create({
    root,
    target,
    isActive,
    CreatedBy,
    UpdatedBy,
});

const createVertex = async ({ x, y, isActive, CreatedBy, UpdatedBy }) => Vertex.create({
    x,
    y,
    isActive,
    CreatedBy,
    UpdatedBy,
});

const createPrivilegeLevel = async ({ name, isActive, CreatedBy, UpdatedBy }) => PrivilegeLevel.create({
    name,
    isActive,
    CreatedBy,
    UpdatedBy,
});

module.exports = {
    createArea,
    createAreaEdge,
    createEdge,
    createVertex,
    createPrivilegeLevel
};