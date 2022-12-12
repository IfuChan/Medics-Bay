const bcrypt = require("bcryptjs");

const Patient = require("../models/patients");

const { isLogin } = require('../middleware/auth');

const loginView = (req, res) => {
    return res.render('login');
}

const signupView = (req, res) => {
    res.render('signin');
}

const deAuth = async (req, res) => {
    const { user } = res.locals;

    var tokens = user.tokens.filter((token) => {
        return token.token !== req.token;
    });

    if (!tokens) {
        return res.status(500).send("error in logout ");
    }

    res.clearCookie("jwt");

    await user.save();
    console.log("User logged out successfully");

    return res.redirect('/');

}

const registration = async (req, res) => {
    try {
        const registerUser = new Patient({
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
        const userExists = await Patient.findOne({ email: email });

        if (userExists) {
            return res.render("signin", {
                msg: "Email address is already registered"
            });
        }

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

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}


const login = async (req, res) => {

    try {
        const email = req.body.email;
        const pass = req.body.pass;
        const userLoggedInCreds = await Patient.findOne({ email: email }); //first email is of the db field second is of the user input

        if (!userLoggedInCreds) {
            return res.render("login", {
                msg: "Invalid email or password"
            });
        }
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

    } catch (error) {
        res.status(400).send("invalid login details" + error);
    }
}


module.exports = {
    loginView,
    signupView,
    deAuth,

    registration,
    login,
}