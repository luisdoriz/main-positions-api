'use strict';
module.exports = (sequelize, DataTypes) => {
const Gateway = sequelize.define(
'Gateway', { 
   idGateway: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   macAddress: {
      type: DataTypes.STRING
   }, 
   idArea: {
      type: DataTypes.INTEGER, 
      allowNull:false
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

Gateway.associate = function(models) {
Gateway.belongsTo(models.Area, {
 foreignKey: 'idArea',
 target: 'idArea'
});


}

return Gateway;
};
