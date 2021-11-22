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
      allowNull:true
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

User.associate = function(models) {
User.hasOne(models.Role, {
 foreignKey: 'idRole',
 target: 'idRole'
});

User.belongsTo(models.Organization, {
   foreignKey: {
      name: 'idOrganization',
      allowNull: true
   },
   constraints: false,
   target: 'idOrganization',
});


}

return User;
};
