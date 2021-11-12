const { Area, AreaEdge, Edge, Vertex, PrivilegeLevel } = require('../../models');

const createArea = async ({ area, vertices, isActive, CreatedBy, UpdatedBy }) => {
    const newArea = await Area.create({
        name: area.name,
        timeLimit: area.timeLimit,
        maxCapacity: area.maxCapacity,
        idFacility: area.idFacility,
        isActive,
        CreatedBy,
        UpdatedBy,
    })
    //create vertices
    let newVertices = [] //ids
    for (let vertex of vertices) {
        let newVertex = await Vertex.create({
            x: vertex.x,
            y: vertex.y,
            isActive,
            CreatedBy,
            UpdatedBy,
        })
        newVertices.push(newVertex.idVertex)
    }

    //create edges
    let newEdges = []
    for (let i = 0; i < newVertices.length; i++) {
        let root = newVertices[i]
        let target = newVertices[i + 1]
        if (i === newVertices.length - 1) { //if last element, pair with first
            target = newVertices[0]
        }
        let newEdge = await Edge.create({
            root,
            target,
            isActive,
            CreatedBy,
            UpdatedBy,
        })
        newEdges.push(newEdge.idEdge)
    }

    //create AreaEdge
    for (let idEdge of newEdges) {
        await AreaEdge.create({
            idEdge,
            idArea: newArea.idArea,
            isActive,
            CreatedBy,
            UpdatedBy,
        })
    }

    return newArea
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