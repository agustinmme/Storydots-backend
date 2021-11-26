const User = require("../models/User");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Logearse
const signIn = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    const response = await User.findOne({ where: {email:email} });

    if (!response) {
      throw new Error("Email/User not exist");
    }

    if (!bcrypt.compareSync(pass, response.password)) {
      throw new Error("Credential Error");
    }

    let token = jwt.sign({ user: response.email }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });

    res.send({
        user:response.email,
        token
    })
  } catch (e) {
    next(e);
  }
};

//Registarse
const singUp = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    if(pass.length<5 || pass.length>60){
        throw new Error("Password only allow values with length between 5 and 60");
    }
    
    //Encriptado
    let password = bcrypt.hashSync(pass, Number.parseInt(authConfig.rounds));

    //Nuevo usuario
    const response = await User.create({
      email,
      password,
    });

    res.send({ message: "User Register Successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signIn,
  singUp,
};
