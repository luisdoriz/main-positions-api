//delete facilty, area, areaedge, edge, vertice, position, gateway, alert, person, areaaccess, privilegelevel
const { Facility, Area, AreaEdge, Edge, Vertex, Position, Gateway, Alert, Person, Employee, Visitor, PrivilegeLevel, AreaAccess, Case } = require('../../models');
const { readGateways } = require('../gateways')
const { readArea } = require('../areas')

const deleteFacility = async ({ idFacility }) => {
    //deletes everything related to facility

    //get ids of things to delete
    var areasInFacility = await Area.findAll({
        where: {
            isActive: 1
        },
        attributes: [
            'idArea', 'name'
        ],
        include: {
            model: Facility,
            where: {
                idFacility,
            },
            attributes: []
        },
        raw: true
    });
    idAreas = areasInFacility.map(a => a.idArea) // [{idArea:1},{idArea:2}]  -->  [1,2]

    var privilegelevel = await PrivilegeLevel.findAll({
        where: {
            isActive: 1
        },
        attributes: ['idPrivilegeLevel'],
        include: {
            model: AreaAccess,
            where: {
                idArea: idAreas,
            },
            attributes: []
        },
        raw: true
    });
    idPrivilegeLevels = privilegelevel.map(a => a.idPrivilegeLevel) // [{idArea:1},{idArea:2}]  -->  [1,2]
    
    var areaEdge = await AreaEdge.findAll({
        where: {
            isActive: 1
        },
        where: {
            idArea: idAreas,
        },
        raw: true
    });
    idEdges = areaEdge.map(a => a.idEdge) // [{idArea:1},{idArea:2}]  -->  [1,2]

    var areaEdge = await Edge.findAll({
        where: {
            isActive: 1
        },
        where: {
            idEdge: idEdges,
        },
        raw: true
    });
    idVertices = areaEdge.map(a => a.root) // [{idArea:1},{idArea:2}]  -->  [1,2]
    
    var persons = await Person.findAll({
        where: {
            isActive: 1
        },
        where: {
            idFacility,
        },
        raw: true
    });
    idPersons = persons.map(a => a.idPerson) // [{idArea:1},{idArea:2}]  -->  [1,2]

    //soft delete 
    await Facility.destroy({
        where: {
            idFacility
        }
    });

    await Position.destroy({
        where: {
            idArea: idAreas
        }
    });

    await Alert.destroy({
        where: {
            idArea: idAreas
        }
    });
    await Gateway.destroy({
        where: {
            idArea: idAreas
        }
    });
    await Vertex.destroy({
        where: {
            idVertex: idVertices
        }
    });
    await Edge.destroy({
        where: {
            idEdge: idEdges
        }
    });
    await AreaEdge.destroy({
        where: {
            idArea: idAreas
        }
    });
    await Area.destroy({
        where: {
            idArea: idAreas
        }
    });
    await AreaAccess.destroy({
        where: {
            idArea: idAreas
        }
    });
    await PrivilegeLevel.destroy({
        where: {
            idPrivilegeLevel: idPrivilegeLevels
        }
    });
    await Employee.destroy({
        where: {
            idPerson: idPersons
        }
    });
    await Visitor.destroy({
        where: {
            idPerson: idPersons
        }
    });
    await Case.destroy({
        where: {
            idPerson: idPersons
        }
    });
    await Person.destroy({
        where: {
            idPerson: idPersons
        }
    });

}

module.exports = {
    deleteFacility,
}