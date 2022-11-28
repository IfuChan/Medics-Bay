//to verify user is authenticated or not
const jwt=require("jsonwebtoken");
const Register=require("../models/register");

const auth=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;  //to get the cookie stored: req.cookies.jwt 3rd value is the name of cookie.
        const verifyUser=jwt.verify(token,"medicsbaysecretkey12");
        const user=await Register.findOne({_id:verifyUser._id});  //db user id: verify user id

        //for logout
        req.token=token;
        req.user=user;

        next();
    } catch (error) {
        res.status(401).send("You do not have authorization to view this page");
        console.log(error)
    }
}

module.exports=auth;