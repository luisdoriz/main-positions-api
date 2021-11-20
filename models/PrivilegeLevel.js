"use strict";
module.exports = (sequelize, DataTypes) => {
  const PrivilegeLevel = sequelize.define(
    "PrivilegeLevel",
    {
      idPrivilegeLevel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      idFacility: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      entryTime: {
        type: DataTypes.STRING,
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

  PrivilegeLevel.associate = function (models) {
    PrivilegeLevel.hasMany(models.Person, {
      foreignKey: "idPrivilegeLevel",
      target: "idPrivilegeLevel",
    });
    PrivilegeLevel.belongsTo(models.Facility, {
      foreignKey: "idFacility",
      // target: "idFacility",
    });
    PrivilegeLevel.hasMany(models.AreaAccess, {
      foreignKey: "idPrivilegeLevel",
      target: "idPrivilegeLevel",
    });
  };

  return PrivilegeLevel;
};
