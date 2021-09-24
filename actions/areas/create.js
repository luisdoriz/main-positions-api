const { Area, AreaEdge, Edge, Vertex, PrivilegeLevel } = require('../../models');

const createArea = async ({ name, timeLimit, maxCapacity, idFacility, isActive, CreatedBy, UpdatedBy }) => Area.create({
    name,
    timeLimit,
    maxCapacity,
    idFacility,
    isActive,
    CreatedBy,
    UpdatedBy,
});

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