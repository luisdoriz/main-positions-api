'use strict';
module.exports = (sequelize, DataTypes) => {
const Alert = sequelize.define(
'Alert', { 
   idAlert: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   payload: {
      type: DataTypes.STRING
   }, 
   entityId: {
      type: DataTypes.INTEGER
   }, 
   idArea: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idPerson: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   date: {
      type: DataTypes.DATE
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

Alert.associate = function(models) {
Alert.belongsTo(models.Area, {
 foreignKey: 'idArea',
 target: 'idArea'
});

Alert.belongsTo(models.Person, {
 foreignKey: 'idPerson',
 target: 'idPerson'
});


}

return Alert;
};
