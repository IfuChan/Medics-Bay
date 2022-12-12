const dummydoc = require("../models/dummydoc");


const dashboardView = async (req, res) => {
    return res.render("dashboard");
}

const getDoctorView = async (req, res) => {
    const { id } = req.params;
    const { recvwd } = req.cookies;

    const doctor = await dummydoc.findOne({ _id: id });

    if (!recvwd) {
        var temp = recvwd + "," + id;
        res.cookie("recvwd", temp, {
            expires: new Date(Date.now() + 600000), //expires in 10 min
            httpOnly: true    //client side can not delete cookie
        });
    }

    // set id in cookie
    res.cookie("recvwd", id, {
        expires: new Date(Date.now() + 600000), //expires in 10 min
        httpOnly: true    //client side can not delete cookie
    });

    return res.render("doctors-profile", {
        name: doctor.name,
        dept: doctor.department,
        qual: doctor.qualification
    });
}

const getUserProfile = async (req, res) => {
    const { user } = res.locals;

    console.log(req.user);

    return res.render("user-profile", {
        username: user.fullname,   //data to show in user profile
        phone: user.phone,
        email1: user.email,
        dob: user.birthday ? user.birthday.toLocaleDateString() : "",
        gender: user.gender,
        address: user.address
    });

}


const appointmentView = async (req, res) => {

    const { user } = res.locals;

    return res.render("appointment", {
        name: user.fullname,   //data to show in user profile
        phone: user.phone,
        email1: user.email,
        dob: user.birthday.toLocaleDateString('en-CA'),
        gender: user.gender,
    });
}

module.exports = {
    dashboardView,
    getDoctorView,
    getUserProfile,
    appointmentView
} 