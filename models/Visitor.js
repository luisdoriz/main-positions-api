'use strict';
module.exports = (sequelize, DataTypes) => {
const Visitor = sequelize.define(
'Visitor', { 
   idVisitor: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   expirationDate: {
      type: DataTypes.DATE
   }, 
   idPerson: {
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

Visitor.associate = function(models) {
Visitor.belongsTo(models.Person, {
 foreignKey: 'idPerson',
 target: 'idPerson'
});


}

return Visitor;
};
