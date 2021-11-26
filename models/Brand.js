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
      validate:{
        len:{
          args: [3,60],             
          msg: "only allow values with length between 3 and 60"
        },
        isAlphanumeric:{
          args: true,
          msg:"Please entre solo letter and number"
        },
      }
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        len:{
          args: [5,255],             
          msg: "only allow values with length between 5 and 255"
        },
        isUrl:{
          args: true,
          msg:"Please entre solo url"
        },
      }
    },
  },
  {
    timestamps: false, //previene que se cree createdAt y updatedAt automaticamente
  }
);

module.exports = Brand;