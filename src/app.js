const { urlencoded } = require("body-parser");
const express = require("express");
const hbs = require("hbs")
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const Register=require("./models/register");
const cookieParser=require("cookie-parser");

const routes = require("./routes/main");

//get user details in json(2), for cookies(3rd)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Path setting for Image, css and js
app.use('/static', express.static("public"));

// dynamic header login logout
app.use(function(req,res,next){ 
    const token=req.cookies.jwt;
    if(token==null){
        res.locals.isAuthenticated=false;
    }else{
        res.locals.isAuthenticated=true;
    }
    
    next();
})

app.use('', routes);

//template engine (hbs)
app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")

//user registration
app.post("/register", async(req,res) =>{
    try {
        const registerUser=new Register({
            fullname: req.body.fname,
            email: req.body.email,
            password: req.body.pass,
            phone: req.body.phone,
            address: req.body.address,
            gender: req.body.gender,
            birthday: req.body.birthday
        })

        //generate jwt
        const token=await registerUser.generateAuthToken();

        //create cookies & save jwt
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+300000), //expires in 5 mins
            httpOnly: true    //client side can not delete cookie
        });

        //data "get" done now save it
        const registered = await registerUser.save();
        console.log("User registered successfully");
        res.status(201).redirect("index");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})

//user login
app.post("/login", async(req,res) =>{
    try {
        const email=req.body.email;
        const pass=req.body.pass;
        const userLoggedInCreds=await Register.findOne({email:email}); //first email is of the db field second is of the user input
        if(userLoggedInCreds==null){
            res.render("login",{
                msg: "Invalid email or password"
            });
        }else{
            if(userLoggedInCreds.password===pass){
                console.log("User logged in successfully");
                const token=await userLoggedInCreds.generateAuthToken();
                res.cookie("jwt",token,{
                    expires:new Date(Date.now()+300000), //expires in 5 mins
                    httpOnly: true,    //client side can not delete cookie
                });
                res.status(201).redirect("user-profile");
            }else{
                res.render("login",{
                    msg: "Invalid email or password"
                });
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

//db connection

// mongoose.connect("mongodb://localhost/doctors-portal", () => {
//     console.log("db connected")
// })

app.listen(process.env.PORT | 3000, () => {
    console.log("Server Start");
});