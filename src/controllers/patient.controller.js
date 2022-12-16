const dummydoc = require("../models/dummydoc");
const Appointment = require('../models/appointments');

const dashboardView = async (req, res) => {
    const { user } = res.locals;

    const appointments = await Appointment.find({ patient: user._id }).populate({ path: "doctor", model: dummydoc });

    return res.render("dashboard", {
        appointments: appointments
    });
}

const getDoctorView = async (req, res) => {
    const { id } = req.params;
    const { recvwd } = req.cookies;

    const doctor = await dummydoc.findOne({ _id: id });

    if (recvwd == null) {
        // var temp = recvwd + "," + id;
        res.cookie("recvwd", id, {
            expires: new Date(Date.now() + 600000), //expires in 10 min
            httpOnly: true    //client side can not delete cookie
        });
    }else{
        var temp = recvwd + "," + id;
        res.cookie("recvwd", temp, {
            expires: new Date(Date.now() + 600000), //expires in 10 min
            httpOnly: true    //client side can not delete cookie
        });
    }

    return res.render("doctors-profile", {
        id: id,
        name: doctor.name,
        dept: doctor.department,
        qual: doctor.qualification,
        desc: doctor.descr
    });
}

const getUserProfile = async (req, res) => {
    const { user } = res.locals;

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
    const { doctorId } = req.params;
    const { user } = res.locals;

    if (!doctorId) {
        return res.redirect("/dashboard");
    }

    return res.render("appointment", {
        name: user.fullname,   //data to show in user profile
        phone: user.phone,
        email1: user.email,
        dob: user.birthday.toLocaleDateString('en-CA'),
        gender: user.gender,
        doctor: doctorId
    });
}

module.exports = {
    dashboardView,
    getDoctorView,
    getUserProfile,
    appointmentView
} 