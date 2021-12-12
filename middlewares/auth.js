const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ mesagge: "Unauthorized access.".toUpperCase() });
  }
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, authConfig.secret, (error, decoded) => {

    if (error) res.status(401).json({message:error.message.toUpperCase()});
    else next();
    
  });
};
