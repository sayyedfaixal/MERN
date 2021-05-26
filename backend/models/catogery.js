const mangoose  = require("mongoose");

const catogerySchema = new mangoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true,
        maxlength : 32,
        unique : true,
    }
},
{ timestamps : true}
);

module.exports = mongoose.model("Category", catogerySchema);