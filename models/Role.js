'use strict';
module.exports = (sequelize, DataTypes) => {
const Role = sequelize.define(
'Role', { 
   idRole: {
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
  createdAt: 'CreationDate',
  updatedAt: 'UpdatedDate',
  paranoid: true,
  freezeTableName: true
  }
);

Role.associate = function(models) {
   Role.hasMany(models.User, {
    foreignKey: 'idRole',
    target: 'idRole'
   });
   
   
   }

return Role;
};
