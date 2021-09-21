'use strict';
module.exports = (sequelize, DataTypes) => {
const Employee = sequelize.define(
'Employee', { 
   idEmployee: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   idPerson: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   internalId: {
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

Employee.associate = function(models) {
Employee.belongsTo(models.Person, {
 foreignKey: 'idPerson',
 target: 'idPerson'
});


}

return Employee;
};
