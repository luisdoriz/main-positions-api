'use strict';
module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define(
    'Case', {
      idCase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      from: {
        type: DataTypes.DATE
      },
      to: {
        type: DataTypes.DATE,
        allowNull: true
      },
      ongoing: {
        type: DataTypes.BOOLEAN
      },
      idPerson: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  Case.associate = function(models) {

    Case.belongsTo(models.Person, {
     foreignKey: 'idPerson',
     target: 'idPerson'
    });
    
    
    }
  return Case;
};