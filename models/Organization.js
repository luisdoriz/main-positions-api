'use strict';
module.exports = (sequelize, DataTypes) => {
const Organization = sequelize.define(
'Organization', { 
   idOrganization: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   name: {
      type: DataTypes.STRING
   }, 
   address: {
      type: DataTypes.STRING
   }, 
   phoneNumber: {
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

return Organization;
};
