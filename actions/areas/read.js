const { Sequelize, sequelize, AreaEdge, Edge, Vertex, PrivilegeLevel, Area, Beacon, AreaAccess } = require('../../models');

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
        if (areaVertices.find(v => v.idArea === idArea)) continue;
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

const readAreasBeacon = async ({ macAddress }) => {
    //get areas where beacon is registered
    let [areas] = await sequelize.query(`
        SELECT "idArea" FROM "Beacon"
        JOIN "AreaAccess" ON "AreaAccess"."idPrivilegeLevel"="Beacon"."idPrivilegeLevel"
        WHERE "macAddress"=:macAddress
    `, {
        replacements: {
            macAddress
        }
    })
    areas = areas.map(a => a.idArea) // [{idArea:1},{idArea:2}]  -->  [1,2]
    const vertices = await AreaEdge.findAll({
        // raw: true,
        where: {
            idArea: areas
        },
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
        if (areaVertices.find(v => v.idArea === idArea)) continue;
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
    readAreasBeacon,
    readAreasAll,
    readPrivilegeLevels
}