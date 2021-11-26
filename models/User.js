const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");


const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
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
                        return next('Email already in use!');
                    }
                    return next();
                })
                .catch(function (err) {
                    return next(err);
                });
        },
        isEmail:{
          args: true,
          msg:"Email only allow values type of mails"
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