const User = require("../models/User");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Logearse
//Retorna token necesario para poder utilzar rutas/endpoint protegidas.
const signIn = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    const response = await User.findOne({ where: { email: email } });

    if (Object.entries(req.body).length === 0)
      res.status(400).json({
        message:
          "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [EMAIL],[PASSWORD]",
      });

    if (!response) {
      res.status(404).json({
        message: "EMAIL/USER NOT EXIST",
      });
    }
    if (!bcrypt.compareSync(pass, response.password)) {
      res.status(400).json({
        message: "CREDENTIAL ERRROR",
      });
    }

    let token = jwt.sign({ user: response.email }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });

    res.send({
      token
    });
  } catch (e) {
    next(e);
  }
};

//Registarse
//Recibe datos de una req,encripta la password,crea/almacena el usuario y retorna un mensaje de exito o error.
const singUp = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    if (Object.entries(req.body).length === 0)
      res.status(400).json({
        message:
          "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [EMAIL],[PASSWORD]",
      });

    if (pass.length < 5 || pass.length > 60) {
      res.status(400).json({
        message: "PASSWORD ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 60",
      });
    }

    //Encriptado
    let password = bcrypt.hashSync(pass, Number.parseInt(authConfig.rounds));

    //Nuevo usuario
    const response = await User.create({
      email,
      password,
    });

    res.status(201).json({ message: "USER REGISTER SUCCESSFULLY" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signIn,
  singUp,
};
