'use strict';
module.exports = (sequelize, DataTypes) => {
const AreaEdge = sequelize.define(
'AreaEdge', { 
   idAreaEdge: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   idEdge: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idArea: {
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
  paranoid: true,
  freezeTableName: true
  }
);

AreaEdge.associate = function(models) {
AreaEdge.belongsTo(models.Edge, {
 foreignKey: 'idEdge',
 target: 'idEdge'
});

AreaEdge.belongsTo(models.Area, {
 foreignKey: 'idArea',
 target: 'idArea'
});


}

return AreaEdge;
};
