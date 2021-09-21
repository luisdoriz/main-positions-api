'use strict';
module.exports = (sequelize, DataTypes) => {
const Person = sequelize.define(
'Person', { 
   idPerson: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   name: {
      type: DataTypes.STRING
   }, 
   firstLastName: {
      type: DataTypes.STRING
   }, 
   secondLastName: {
      type: DataTypes.STRING
   }, 
   email: {
      type: DataTypes.STRING
   }, 
   idFacility: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idBeacon: {
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
  freezeTableName: true,
 comment: 'Person who holds a beacon'
  }
);

Person.associate = function(models) {
Person.belongsTo(models.Facility, {
 foreignKey: 'idFacility',
 target: 'idFacility'
});

Person.belongsTo(models.Beacon, {
 foreignKey: 'idBeacon',
 target: 'idBeacon'
});


}

return Person;
};
