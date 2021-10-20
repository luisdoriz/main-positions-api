'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlertType = sequelize.define(
    'AlertType', {
      idAlertType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.STRING
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

  AlertType.associate = function(models) {
    AlertType.hasOne(models.Alert, {
      foreignKey: 'idAlertType',
      target: 'idAlertType'
    });


  }

  return AlertType;
};