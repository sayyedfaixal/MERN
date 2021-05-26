require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();

//Middle-ware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Below lines get the output from routes>auth.js file which exports the route
const authRoutes= require("./routes/auth.js");
// const userRoutes = require(".\\routes/user.js");
//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(()=>{
    console.log("DB CONNECTED");
});


//Middle-wares

app.use(express.json()); 
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", authRoutes);

//PORT
//process.env.PORT because when hosting on cloud we dont want anyone to look our port and the connect url. for that we will be using
//env variable in order to hide this port
const port = process.env.PORT || 8000;

//Starting Server
app.listen(port, ()=>{
    console.log(`App is running at port : ${port}`);
})