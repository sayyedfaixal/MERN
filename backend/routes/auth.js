var express = require("express");
var router = express.Router();
const { body, validationResult, check } = require('express-validator');

//importing signout from controller
const { signout , signup, signin, isSignedIn } = require("../controllers/auth");


//Validation during SignUp of a user

router.post("/signup",[
    //checking validation for username
    check("name").isLength({min:3})
    .withMessage("Name must be atleast 3 chars long"),
    //checking validation for email
    check("email").isEmail()
    .withMessage("Email is required"),
    //checking validation for password
    check("password").isLength({ min : 3})
    .withMessage("Password must be atleast 3 char long"),

], signup);

//Validation during SignIn of a user
router.post("/signin",[
    
    //checking validation for email
    check("email").isEmail()
    .withMessage("Email is required"),
    //checking validation for password
    check("password").isLength({ min : 3})
    .withMessage("Password field must not be Empty!"),

], signin);

router.get("/signout", signout);


router.get("/testroute", isSignedIn,(req, res)=>{
    res.send("A protected route");
});
module.exports = router;
