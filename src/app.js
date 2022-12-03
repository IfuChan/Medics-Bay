require('dotenv').config();
const { urlencoded } = require("body-parser");
const express = require("express");
const hbs = require("hbs")
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const Register = require("./models/register");
const cookieParser = require("cookie-parser");
const Medicine = require("./models/Medicine");
const Dermatologists = require("./models/Dermatologists");
const Cardiologists = require("./models/Cardiologists");
const Gastrologists = require("./models/Gastrologists");
const Urologists = require("./models/Urologists");
const Psychiatrists = require("./models/Psychiatrists");
const routes = require("./routes/main");
const bcrypt=require("bcryptjs");
const dummydoc=require("./models/dummydoc.js");

//get user details in json(2), for cookies(3rd)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Path setting for Image, css and js
app.use('/static', express.static("public"));

// dynamic header login logout
app.use(function (req, res, next) {
    const token = req.cookies.jwt;
    if (token == null) {
        res.locals.isAuthenticated = false;
    } else {
        res.locals.isAuthenticated = true;
    }
    next();
})

app.use('', routes);

//template engine (hbs)
app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")

//user registration
app.post("/register", async (req, res) => {
    try {
        const registerUser = new Register({
            fullname: req.body.fname,
            email: req.body.email,
            password: req.body.pass,
            phone: req.body.phone,
            address: req.body.address,
            gender: req.body.gender,
            birthday: req.body.birthday
        })
        const email = req.body.email;
        //check if user exists
        const userExists = await Register.findOne({ email: email });
        if (userExists != null) {
            res.render("signin", {
                msg: "Email address is already registered"
            });
        } else {
            //generate jwt
            const token = await registerUser.generateAuthToken();

            //create cookies & save jwt
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000), //expires in 5 mins
                httpOnly: true    //client side can not delete cookie
            });
            // res.cookie("user", registerUser._id, {httpOnly: true});

            //data "get" done now save it
            const registered = await registerUser.save();
            console.log("User registered successfully");
            res.status(201).redirect("/");
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})

//user login
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;
        const userLoggedInCreds = await Register.findOne({ email: email }); //first email is of the db field second is of the user input
        if (userLoggedInCreds == null) {
            res.render("login", {
                msg: "Invalid email or password"
            });
        } else {
            const passwordMatch = await bcrypt.compare(pass, userLoggedInCreds.password);
            if (passwordMatch) {
                console.log("User logged in successfully");
                const token = await userLoggedInCreds.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 3000000), //expires in 50 mins
                    httpOnly: true,    //client side can not delete cookie
                });
                res.status(201).redirect("user-profile");
            } else {
                res.render("login", {
                    msg: "Invalid email or password"
                });
            }
        }
    } catch (error) {
        res.status(400).send("invalid login details"+error);
    }
})

//search Doctors
app.post("/searchDoctors", async (req, res) => {
    let payload=req.body.payload.trim();
    let search=await dummydoc.find({name: {$regex: new RegExp(payload+'.*','i')}}).exec();
    //search.search.slice(0,10); //to limit search results
    res.send({payload: search});
});


// Medicine.create([
//     {
//         department: 'Medicine',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Medicine',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Medicine',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

// Dermatologists.create([
//     {
//         department: 'Dermatologists',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Dermatologists',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Dermatologists',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

// Cardiologists.create([
//     {
//         department: 'Cardiologists',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Cardiologists',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Cardiologists',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

// Gastrologists.create([
//     {
//         department: 'Gastrologists',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Gastrologists',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Gastrologists',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

// Urologists.create([
//     {
//         department: 'Urologists',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Urologists',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Urologists',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

// Psychiatrists.create([
//     {
//         department: 'Psychiatrists',
//         description: 'Dr. A F M Ekramuddaula , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Psychiatrists',
//         description: 'Dr. Mita , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
//     {
//         department: 'Psychiatrists',
//         description: 'Dr. Rakib , MBBS, FCPS (ENT), MS (Otolaryngology) Coordinator & Senior Consultant'
//     },
// ])

app.listen(process.env.PORT | 3000, () => {
    console.log("Server Start");
});