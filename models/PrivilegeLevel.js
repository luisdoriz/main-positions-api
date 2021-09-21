'use strict';
module.exports = (sequelize, DataTypes) => {
const PrivilegeLevel = sequelize.define(
'PrivilegeLevel', { 
   idPrivilegeLevel: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   name: {
      type: DataTypes.STRING
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

return PrivilegeLevel;
};
