const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");


const Brand = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate:{
        len:{
          args: [3,60],             
          msg: "NAME BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60"
        },
        
        isAlphanumeric:{
          args: true,
          msg:"NAME BRAND ONLY ALLOW VALUES WITH LETTER AND NUMBER"
        },
      }
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        len:{
          args: [5,255],             
          msg: "LOGO BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255"
        },
        isUrl:{
          args: true,
          msg:"PLEASE ENTRE SOLO URL. FORMAT EXAMPLE : (HTTP://FOO.COM)"
        },
      }
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Brand;