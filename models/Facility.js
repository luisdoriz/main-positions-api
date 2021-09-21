'use strict';
module.exports = (sequelize, DataTypes) => {
const Facility = sequelize.define(
'Facility', { 
   idFacility: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   sizeX: {
      type: DataTypes.INTEGER
   }, 
   sizeY: {
      type: DataTypes.INTEGER
   }, 
   idOrganization: {
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

Facility.associate = function(models) {
Facility.belongsTo(models.Organization, {
 foreignKey: 'idOrganization',
 target: 'idOrganization'
});


}

return Facility;
};
