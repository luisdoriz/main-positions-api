'use strict';
module.exports = (sequelize, DataTypes) => {
const Area = sequelize.define(
'Area', { 
   idArea: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   name: {
      type: DataTypes.STRING
   }, 
   timeLimit: {
      type: DataTypes.INTEGER
   }, 
   maxCapacity: {
      type: DataTypes.INTEGER
   }, 
   idFacility: {
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
  freezeTableName: true
  }
);

Area.associate = function(models) {
Area.belongsTo(models.Facility, {
 foreignKey: 'idFacility',
 target: 'idFacility'
});


}

return Area;
};
