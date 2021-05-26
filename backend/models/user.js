var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        maxlenght : 32,
        trim : true,
        required : true 
    },
    lastname :{
        type : String,
        required: true,
        maxlenght : 32,
        trim : true
    },
    email:{
        type : String,
        required : true,
        trim :true,
        unique : true
    },
    userinfo :{
        type : String,
        trim : true
    },
    encry_password:{
        type : String,
        required : true

    },
    salt :String,
    //what is the role of the person?-> Student, Admin, Staff etc, Higher the Number type more provelage is the user eg: 0-> student, 3->admin
    role :{
        type :Number,
        default: 0
    },
    purchases: {
        type : Array,
        default : []
    }
},
{ timestamps : true}
);

userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();   //creating a salt from uuidv1 and it will be added with the plainpasssword
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {

    authenticate : function(plainPassword){
        return this.securePassword(plainPassword)=== this.encry_password;
    },
    securePassword : function (plainPassword){
        if(!plainPassword) return "";
        try {
           return crypto.createHmac('sha256', this.salt)
           .update(plainPassword)
           .digest('hex'); 
        } catch (err) {
            return "";
        }
    }
}
module.exports = mongoose.model("User", userSchema)