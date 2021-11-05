"use strict";
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      idPerson: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoincrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      firstLastName: {
        type: DataTypes.STRING,
      },
      secondLastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      idFacility: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idBeacon: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idPrivilegeLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      comment: "Person who holds a beacon",
    }
  );

  Person.associate = function (models) {
    Person.belongsTo(models.Facility, {
      foreignKey: "idFacility",
      target: "idFacility",
    });

    Person.belongsTo(models.Beacon, {
      foreignKey: "idBeacon",
      target: "idBeacon",
    });

    Person.hasOne(models.Case, {
      foreignKey: "idPerson",
      target: "idPerson",
    });

    Person.hasOne(models.Position, {
      foreignKey: "idPerson",
      target: "idPerson",
    });
  };

  return Person;
};
