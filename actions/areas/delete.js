const { Area, AreaEdge, Edge, Vertex } = require('../../models');

const deleteArea = async ({ idArea }) => {
    await Area.destroy({
        where: {
            idArea
        }
    });
}

module.exports = {
    deleteArea,
}