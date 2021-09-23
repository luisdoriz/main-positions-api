'use strict';
module.exports = (sequelize, DataTypes) => {
const Edge = sequelize.define(
'Edge', { 
   idEdge: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   root: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   target: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   isActive: {
      type: DataTypes.INTEGER
   }, 
   CreatedBy: {
      type: DataTypes.INTEGER
   }, 
   CreationDate: {
      type: DataTypes.DATE
   }, 
   UpdatedBy: {
      type: DataTypes.INTEGER
   }, 
   UpdatedDate: {
      type: DataTypes.DATE
   }
}, { 
  timestamps: true,
  createdAt: 'CreationDate',
  updatedAt: 'UpdatedDate',
  paranoid: true,
  freezeTableName: true,
 comment: 'Represent walls (arista)'
  }
);

Edge.associate = function(models) {
Edge.belongsTo(models.Vertex, {
 foreignKey: 'root',
 target: 'idVertex'
});

Edge.belongsTo(models.Vertex, {
 foreignKey: 'target',
 target: 'idVertex'
});


}

return Edge;
};
