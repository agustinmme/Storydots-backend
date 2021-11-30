const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      
      unique: true,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          Product.findOne({where: {name: value}})
              .then(function (product) {
                  if (product && self.id !== product.id) {
                      return next('NAME PRODUCT ALREADY IN USE!');
                  }
                  return next();
              })
              .catch(function (err) {
                  return next(err);
              });
      },
        len: {
          args: [3, 60],
          msg: "NAME PRODUCT ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60",
        },
      
        isAlphanumeric: {
          args: true,
          msg: "NAME PRODUCT ONLY ALLOW VALUES WITH LETTER AND NUMBER",
        },
      },
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [0, 150],
          msg: "PRODUCT DESCRIPTION ONLY ALLOWS VALUES WITH LENGTH LESS THAN 150",
        },
       
        isAlphanumeric: {
          args: true,
          msg: "NAME PRODUCT ONLY ALLOW VALUES WITH LETTER AND NUMBER",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [5, 255],
          msg: "PRODUCT IMAGE ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255",
        },
        isUrl: {
          args: true,
          msg:"PLEASE ENTRE SOLO URL. FORMAT EXAMPLE : (HTTP://FOO.COM)"
        },
      },
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "PLEASE ENTRE SOLO VALUES NUMERICS",
        },
      },
    },
  },
  {
    timestamps: false, 
  }
);

module.exports = Product;
