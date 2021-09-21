'use strict';
module.exports = (sequelize, DataTypes) => {
const Vertex = sequelize.define(
'Vertex', { 
   idVertex: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   x: {
      type: DataTypes.INTEGER
   }, 
   y: {
      type: DataTypes.INTEGER
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

return Vertex;
};
