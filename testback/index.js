const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) =>{
    return res.send("Hello Aliens! You are on Home Page");
});

app.get("/login", (req, res) =>{
    return res.send("This is Login Page");
});
app.get("/signout", (req, res) =>{
    return res.send("Sed... You are going? Bye, Bye!");
});
app.get("/faisal", (req, res) =>{
    return res.send("Hello Evereyone, I am Faisal");
});
app.get("/signup", (req, res) =>{
    return res.send("Please Signup");
});

app.listen(port, ()=>{
    console.log("Server is UP and running...");
});