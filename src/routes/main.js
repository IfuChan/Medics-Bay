const express = require('express');
const auth = require("../middleware/auth");
const Medicine = require('../models/Medicine');
const Dermatologists = require('../models/Dermatologists');
const Cardiologists = require('../models/Cardiologists');
const Gastrologists = require('../models/Gastrologists');
const Urologists = require('../models/Urologists');
const Psychiatrists = require('../models/Psychiatrists');
const dummydoc=require("../models/dummydoc");
// const smthg=require('../../public/js/map.js');

const router = express.Router();

router.get('/map', (req, res) => {
    let docs = [
        {
          "lat": 23.79257505141491,
          "lng": 90.40803110635434,
          "name": "Ifad"
        },
        {
            "lat": 23.772897951978386,
            "lng": 90.37175903312999,
            "name": "Sam"
        },
        {
            "lat": 24.772897951978586,
            "lng": 91.37175903312990,
            "name": "Witwicky"
        }
      ];
    res.render("mapdemo",{
        docs: docs
    });
});

router.get('/', (req, res) => {
    // const user=req.cookies.user;
    // console.log("user token received: "+user);
    res.render("index");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currToken) => {
            return currToken.token !== req.token;
        })
        res.clearCookie("jwt");
        console.log("User logged out successfully");
        await req.user.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("error in logout " + error);
    }
});

router.get('/signin', (req, res) => {
    res.render("signin");
});


router.get('/doctors-profile/:id', async (req, res) => {
    let doc=await dummydoc.findOne({_id: req.params.id});
    res.render("doctors-profile", {
        name: doc.name,
        dept: doc.department,
        qual: doc.qualification
    });
});

router.get('/review', (req, res) => {
    res.render("review");
});

router.get('/user-profile', auth, (req, res) => {
    res.render("user-profile", {
        username: req.user.fullname,   //data to show in user profile
        phone: req.user.phone,
        email1: req.user.email,
        dob: req.user.birthday.toLocaleDateString(),
        gender: req.user.gender,
        address: req.user.address
    });
});

router.get('/aboutus', (req, res) => {
    res.render("aboutus");
});

// Old specialist showing system:
// router.get("/medicine", async (req, res) => {
//     const medicine = await Medicine.find()
//     // console.log(medicine);

//     res.render("medicine", {
//         medicine: medicine,
//     });
// });

// NEW:
router.get("/medicine", async (req, res) => {
    const medicine = await dummydoc.find({department: "Medicine"});
    // console.log(medicine);

    res.render("specialist", {
        specialists: medicine,
        dept: "Medicine",
        mapApi: process.env.GAPI
    });
});

router.get("/dermatologists", async (req, res) => {
    const dermatologists = await dummydoc.find({department: "Dermatologists"});
    // console.log(medicine);

    res.render("specialist", {
        specialists: dermatologists,
        dept: "Dermatology",
        mapApi: process.env.GAPI
    });
});

router.get("/cardiologists", async (req, res) => {
    const cardiologists = await dummydoc.find({department: "Cardiologists"});
    // console.log(medicine);

    res.render("specialist", {
        specialists: cardiologists,
        dept: "Cardiology",
        mapApi: process.env.GAPI
    });
});

router.get("/gastrologists", async (req, res) => {
    const gastrologists = await dummydoc.find({department: "Gastrologists"});
    // console.log(medicine);

    res.render("specialist", {
        specialists: gastrologists,
        dept: "Gastrology",
        mapApi: process.env.GAPI
    });
});

router.get("/urologists", async (req, res) => {
    const urologists = await dummydoc.find({department: "Urologists"});
    // console.log(medicine);

    res.render("specialist", {
        specialists: urologists,
        dept: "Urology",
        mapApi: process.env.GAPI
    });
});

router.get("/psychiatrists", async (req, res) => {
    const psychiatrists = await dummydoc.find({department: "Psychiatrists"});

    res.render("specialist", {
        specialists: psychiatrists,
        dept: "Psychiatry",
        mapApi: process.env.GAPI
    });
});

router.get('/appointment', auth, (req, res) => {
    res.render("appointment", {
        name: req.user.fullname,   //data to show in user profile
        phone: req.user.phone,
        email1: req.user.email,
        dob: req.user.birthday.toLocaleDateString('en-CA'),
        gender: req.user.gender,
    });
});

router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});

module.exports = router;