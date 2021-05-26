const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema; 

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    trim :true,
    required: true,
    maxlenght : 32
    },

    description :{
        type :String,
        required : true,
        trim : true,
        maxlenght: 2000
    },

    price:{
        type :Number,
        required : true,
        maxlenght : 32,
        trim : true
    },

    //refering from Category.js because it is expoerting Category so we are using the same name here
    catogery : {
        type : ObjectId,
        ref: "Category",
        required : true
    },
    stock:{
        type :Number,
    },
    sold :{
        type : Number,
        default : 0
    },

    //putting image into Data Base
    photo :{
        data : Buffer,
        contentType : String
    }
}, {timestamps : true});

module.exports = mongoose.model("Product", productSchema);