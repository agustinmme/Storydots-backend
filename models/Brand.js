const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");


const Brand = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false, //previene que se cree createdAt y updatedAt automaticamente
  }
);

module.exports = Brand;