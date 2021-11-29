const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");


const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        //Validacion custom para generar un mensaje por emial/usuarios repetidos.
        isUnique: function (value, next) {
            var self = this;
            User.findOne({where: {email: value}})
                .then(function (user) {
                    if (user && self.id !== user.id) {
                        return next('EMAIL ALREADY IN USE!');
                    }
                    return next();
                })
                .catch(function (err) {
                    return next(err);
                });
        },
        isEmail:{
          args: true,
          msg:"EMAIL ONLY ALLOW VALUES TYPE OF MAILS"
        },
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false, //previene que se cree createdAt y updatedAt automaticamente
  }
);

module.exports = User;