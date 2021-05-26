//route file and controller file name must be same
const User = require("../models/user");
const { body, validationResult, check } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



exports.signup = (req, res) =>{  

  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({
        error : errors.array()[0].msg,
        // error : errors.array()[0].param
      });
    }
      const user = new User(req.body);
      user.save((err, user)=>{
          if(err || !user){
            console.log(err);
            return res.status(400).json({
              err : "NOT able to save in DB"
            })
          }
          res.json({
            name : user.name,
            email : user.email,
            id: user._id
          });
      });
    //   res.json({
    //     message : "Signup Successfully"
    // });
};

exports.signin=(req, res)=>{
  //getting username and password
  const {email, password} = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      error : errors.array()[0].msg,
      // error : errors.array()[0].param
    });
  }

  //finding the data from DB findone finds the 1st entry from the DB
  User.findOne({email}, (err, user)=>{
    if(err){
      return res.status(400).json({
         error : "User email does not exists"
      });
    }
    else if(!user){
      return res.json({
        error : "User Does not exists"
      });
    }

    //checking if email and password from the DB and the input are same
    if(!user.authenticate(password)){
        return res.status(401).json({
          error : "Email or Password do not match"
        })
    }

    //if both the email and password are correct we will generate the token and put into the browser using cookie  
    //so that we can confirm that the user is signed in
    const token = jwt.sign({_id : user._id}, process.env.SECRET);

    //put token in cookie
    res.cookie("Token", token, {expire : new Date() + 9999});

    //sending information to front end
    const {_id, name, email, role} =user;
    return res.json({token, user:{_id, name, email, role}});
  });
};
exports.signout = (req, res)=>{
  //clearning cookie to signout the user
    res.clearCookie("token");
    res.json({
        message : "Signout Successfully"
    });
};  
//protected routes
// to check if the user is signed in or not
exports.isSignedIn = expressJwt({
  secret : process.env.SECRET,
  userProperty : "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next)=>{
  let checker = req.profile && req.auth && req.profile._id === req.auth._id ;
  if(!checker){
    res.status(403).json({
      error : "ACCESS DENIED"
    });
  }

  next();
};

exports.isAdmin = (req, res, next)=>{

  //higher the role number higher the provilages; You can check the user.js to see the schema for the role of the user default is 0;
  if(req.profile.role === 0){
      return res.status(403).json({
        error : "You are not an ADMIN, ACCESS DENIED"
      });
  }
  next();
};