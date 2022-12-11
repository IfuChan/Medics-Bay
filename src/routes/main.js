const express = require('express');
const auth = require("../middleware/auth");
const dummydoc = require("../models/dummydoc");

const router = express.Router();

router.get('/', async (req, res) => {
    //get cookie for recently viewed doctor:
    if(req.cookies.recvwd != null){
        res.locals.recvwd=true;
        var docId=req.cookies.recvwd;
        var recdoclist=docId.split(",");
        let doc = await dummydoc.find({ _id: recdoclist });
        revdoc=doc.reverse().slice(0,4);
        res.render("index", {
            recdoc: revdoc
        });
    }else{
        res.locals.recvwd=false;
        res.render("index");
    }
    
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
    let doc = await dummydoc.findOne({ _id: req.params.id });
    if(req.cookies.recvwd == null){
        res.cookie("recvwd", req.params.id, {
            expires: new Date(Date.now() + 600000), //expires in 10 min
            httpOnly: true    //client side can not delete cookie
        });
    }
    else{
        var recCookie=req.cookies.recvwd;
        var temp=recCookie+","+req.params.id;
        res.cookie("recvwd", temp, {
            expires: new Date(Date.now() + 600000), //expires in 10 min
            httpOnly: true    //client side can not delete cookie
        });
    }
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
    const medicine = await dummydoc.find({ department: "Medicine" });
    // console.log(medicine);

    res.render("specialist", {
        specialists: medicine,
        dept: "Medicine",
        mapApi: process.env.GAPI
    });
});

router.get("/dermatologists", async (req, res) => {
    const dermatologists = await dummydoc.find({ department: "Dermatologists" });
    // console.log(medicine);

    res.render("specialist", {
        specialists: dermatologists,
        dept: "Dermatology",
        mapApi: process.env.GAPI
    });
});

router.get("/cardiologists", async (req, res) => {
    const cardiologists = await dummydoc.find({ department: "Cardiologists" });
    // console.log(medicine);

    res.render("specialist", {
        specialists: cardiologists,
        dept: "Cardiology",
        mapApi: process.env.GAPI
    });
});

router.get("/gastrologists", async (req, res) => {
    const gastrologists = await dummydoc.find({ department: "Gastrologists" });
    // console.log(medicine);

    res.render("specialist", {
        specialists: gastrologists,
        dept: "Gastrology",
        mapApi: process.env.GAPI
    });
});

router.get("/urologists", async (req, res) => {
    const urologists = await dummydoc.find({ department: "Urologists" });
    // console.log(medicine);

    res.render("specialist", {
        specialists: urologists,
        dept: "Urology",
        mapApi: process.env.GAPI
    });
});

router.get("/psychiatrists", async (req, res) => {
    const psychiatrists = await dummydoc.find({ department: "Psychiatrists" });

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