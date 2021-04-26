const jwt = require("jsonwebtoken")
const {secret} = require('../data/config/secrets');

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization

  if(!token){
    res.status(401).json("You do not have an authenticated token")
  }else{
    //check the token 
    jwt.verify(token, secret, (err,decoded)=>{
      if(err){
        res.status(401).json("Token is invalid" + err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
};
