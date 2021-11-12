'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define(
    'Position', {
      idPosition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      x: {
        type: DataTypes.FLOAT
      },
      y: {
        type: DataTypes.FLOAT
      },
      from: {
        type: DataTypes.DATE
      },
      to: {
        type: DataTypes.DATE
      },
      idArea: {
        type: DataTypes.INTEGER,
        allowNull: false
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

  Position.associate = function(models) {
    Position.belongsTo(models.Area, {
      foreignKey: 'idArea',
      target: 'idArea'
    });


  }

  return Position;
};