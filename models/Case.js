'use strict';
module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define(
    'Case', {
      idCase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      from: {
        type: DataTypes.DATE
      },
      to: {
        type: DataTypes.DATE
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

  return Case;
};