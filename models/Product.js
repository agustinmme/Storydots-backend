const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 60],
          msg: "Name product only allow values with length between 3 and 60",
        },
        isAlphanumeric: {
          args: true,
          msg: "Name product only allow values with letter and number",
        },
      },
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [0, 150],
          msg: "Product description only allows values with length less than 150",
        },
        isAlphanumeric: {
          args: true,
          msg: "Name product only allow values with letter and number",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [5, 255],
          msg: "Product image only allow values with length between 5 and 255",
        },
        isUrl: {
          args: true,
          msg:"Please entre solo url. format Example : (http://foo.com)"
        },
      },
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "Please entre solo values numerics",
        },
        len: {
          args: [1, 10],
          msg: "Price only allow values with length between 1 and 10",
        }
      },
    },
  },
  {
    timestamps: false, //previene que se cree createdAt y updatedAt automaticamente
  }
);

module.exports = Product;
