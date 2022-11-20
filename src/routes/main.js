const express = require('express');
const auth = require("../middleware/auth");
const Specialist = require('../models/Specialist');

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/doctors-profile', (req, res) => {
    res.render("doctors-profile");
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

router.get("/specialist", async (req, res) => {
    const medicine = await Specialist.find()
    // console.log(medicine);

    res.render("specialist", {
        medicine: medicine,
    });
});

router.get('/appointment', (req, res) => {
    res.render("appointment");
});

router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});

module.exports = router;