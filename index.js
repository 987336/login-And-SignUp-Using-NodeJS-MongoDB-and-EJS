const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser')
const {setUser} = require("./services/auth");
const {SingUpModel} = require("./models/user");
const {restrictForNotLoggedIn} = require("./middleware/auth")

const PORT = 8001;
const app = express();
app.use(express.json());
app.use(cookieParser());

//Middleware
app.use(express.urlencoded({ extended: false }));

// set the view engine to ejs //
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

// MongoDB Connections

mongoose.connect("mongodb://localhost:27017/LoginAndSingUp")
.then(()=>{console.log("Mongo DB Database Connected")})


//Login Api

app.post("/createUser",async(req,res)=>{
    const {username,email,password} = req.body;
    if(!req.body) return res.status(404).json({msg:"Email And Pass required"})
    const userData = await SingUpModel.create({
        username : username,
        email : email,
        password : password
    })
    return res.status(201).redirect("/login");
});

// Login Api
app.post("/loginuser",async(req,res)=>{
    const {email,password} = req.body;
    const loginUser = await SingUpModel.findOne({email,password});
    if(!loginUser) return res.status(404).json({error:"Please Check Your Email And Password"});
    const sessionID = uuidv4();
    setUser(sessionID,loginUser);
    res.cookie("uid",sessionID);
    return res.status(200).redirect("/home")
})




// Page Rendering

app.get("/home",restrictForNotLoggedIn,(req,res)=>{
    res.status(200).render("home.ejs");
})
app.get("/",(req,res)=>{
    res.status(200).render("signup.ejs");
})
app.get("/login",(req,res)=>{
    res.status(200).render("login.ejs");
})

app.listen(PORT,()=>console.log(`Server Started on ${PORT}`));

