const Patient = require("../models/patients");


const isUser = async (req, res, next) => {
    const { user } = res.locals;

    var patient = await Patient.findOne({ _id: user._id });

    if (!patient) {
        return res.status(401).json({
            message: "You are not authorized to access this resource",
        });
    }

    res.locals.user = patient;

    return next();

}

module.exports = {
    isUser
}