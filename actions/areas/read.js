const { Sequelize, AreaEdge, Edge, Vertex, PrivilegeLevel } = require('../../models');

const readAreasAll = async () => {
    const vertices = await AreaEdge.findAll({
        // raw: true,
        attributes: [
            'idArea',
            [Sequelize.col('Edge.Vertex.x'), 'x'],
            [Sequelize.col('Edge.Vertex.y'), 'y'],

        ],
        include: [
            {
                model: Edge,
                attributes: [],
                include: [{
                    model: Vertex,
                    attributes: [],
                }]
            }
        ],
    })
    let areaVertices = []
    for (let vertex of vertices) {
        let { idArea, x, y } = vertex.dataValues
        //skip if idArea is already in final array
        if(areaVertices.find(v => v.idArea === idArea)) continue;
        //get all vertices of this area
        const verticesFromArea = []
        vertices.forEach(v => { if (v.idArea === idArea) verticesFromArea.push([v.dataValues.x, v.dataValues.y]) })
        //push to final array
        areaVertices.push({
            idArea: idArea,
            vertices: verticesFromArea
        })
    }
    return areaVertices
}

const readPrivilegeLevels = async () => {
    return PrivilegeLevel.findAll({
        where: {
            isActive: 1
        }
    });
}

module.exports = {
    readAreasAll,
    readPrivilegeLevels
}