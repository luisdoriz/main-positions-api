//delete facilty, area, areaedge, edge, vertice, position, gateway, alert, person, areaaccess, privilegelevel
const { Facility, Area, AreaEdge, Edge, Vertice, Position, Gateway, Alert, Person, Employee, Visitor, A } = require('../../models');

const deleteFacility = async ({ idFacility }) => {
    const x =await Facility.destroy({
        where: {
            idGateway
        }
    });
    console.log(x)
}

module.exports = {
    deleteFacility,
}