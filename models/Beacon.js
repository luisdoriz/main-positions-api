"use strict";
module.exports = (sequelize, DataTypes) => {
  const Beacon = sequelize.define(
    "Beacon",
    {
      idBeacon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      macAddress: {
        type: DataTypes.STRING,
      },
      idFacility: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER,
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
      },
      CreationDate: {
        type: DataTypes.DATE,
      },
      UpdatedBy: {
        type: DataTypes.INTEGER,
      },
      UpdatedDate: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      createdAt: "CreationDate",
      updatedAt: "UpdatedDate",
      paranoid: true,
      freezeTableName: true,
    }
  );

  Beacon.associate = function (models) {
    Beacon.hasOne(models.Person, {
      foreignKey: "idBeacon",
      target: "idBeacon",
    });
    Beacon.belongsTo(models.Facility, {
      foreignKey: "idFacility",
      target: "idFacility",
    });

  };
  return Beacon;
};
