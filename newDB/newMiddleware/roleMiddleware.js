const mongoose = require('mongoose');
const User = mongoose.model('users');

const isDoctor = async (req, res, next) => {
    const user = res.locals.user;

    const doctor = await User.findOne({ _id: user._id, role: 'doctor' });

    if (!doctor) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

const isPatient = async (req, res, next) => {
    const user = res.locals.user;

    const patient = await User.findOne({ _id: user._id, role: 'patient' });

    if (!patient) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

module.exports = { isDoctor, isPatient };

