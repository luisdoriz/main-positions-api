const { Sequelize, sequelize, AreaEdge, Edge, Vertex, PrivilegeLevel, Area, Beacon, AreaAccess, Facility } = require('../../models');
const { readFacilityByIdArea } = require('../facilities')
const { readGateways } = require('../gateways')
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
        const facility = await readFacilityByIdArea(idArea)
        areaVertices.push({
            idArea: idArea,
            idFacility: facility.idFacility,
            facilityName: facility.name,
            vertices: verticesFromArea
        })
    }
    return areaVertices
}

const readAreasBeacon = async ({ macAddress }) => {
    //get areas where beacon is registered
    //get areas where beacon was in last 24h (positions)
    let [areas] = await sequelize.query(`
    SELECT
        "Area".*
    FROM
        "Beacon"
        INNER JOIN "Area" ON "Area"."idFacility" = "Beacon"."idFacility"
    WHERE
        "Beacon"."macAddress" = :macAddress
    `, {
        replacements: {
            macAddress
        }
    })
    if (!areas[0]) throw 'Beacons mac address not found'
    areas = areas.map(a => a.idArea) // [{idArea:1},{idArea:2}]  -->  [1,2]
    //get vertices for each area found
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
    //format and link vertices to area
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
    //get gateways/beacons in organization
    const { beacons } = await readGateways({ macAddress })
    return { areaVertices, beacons }
}

const readPrivilegeLevels = async () => {
    return PrivilegeLevel.findAll({
        where: {
            isActive: 1
        }
    });
}

const readAreasFacility = async ({ idFacility }) => {
    return Area.findAll({
        where: {
            isActive: 1
        },
        attributes: ['idArea', 'name', 'timeLimit', 'maxCapacity', 'idFacility'],
        include: {
            model: Facility,
            where: {
                idFacility,
                isActive: 1
            },
            attributes: []
        }
    });
}

const readArea = async (idArea) => {
    return Area.findOne({
        where: {
            idArea
        }
    });
}

module.exports = {
    readAreasBeacon,
    readAreasAll,
    readPrivilegeLevels,
    readAreasFacility,
    readArea
}