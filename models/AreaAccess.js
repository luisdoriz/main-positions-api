'use strict';
module.exports = (sequelize, DataTypes) => {
const AreaAccess = sequelize.define(
'AreaAccess', { 
   idAreaAccess: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   idArea: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idPrivilegeLevel: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   allowed: {
      type: DataTypes.BOOLEAN
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

AreaAccess.associate = function(models) {
AreaAccess.belongsTo(models.Area, {
 foreignKey: 'idArea',
 target: 'idArea'
});

AreaAccess.belongsTo(models.PrivilegeLevel, {
 foreignKey: 'idPrivilegeLevel',
 target: 'idPrivilegeLevel'
});


}

return AreaAccess;
};
