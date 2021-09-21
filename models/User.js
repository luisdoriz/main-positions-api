'use strict';
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define(
'User', { 
   idUser: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   name: {
      type: DataTypes.STRING
   }, 
   email: {
      type: DataTypes.STRING
   }, 
   password: {
      type: DataTypes.STRING
   }, 
   idRole: {
      type: DataTypes.INTEGER, 
      allowNull:false
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

User.associate = function(models) {
User.belongsTo(models.Role, {
 foreignKey: 'idRole',
 target: 'idRole'
});

User.belongsTo(models.Organization, {
 foreignKey: 'idOrganization',
 target: 'idOrganization'
});


}

return User;
};
