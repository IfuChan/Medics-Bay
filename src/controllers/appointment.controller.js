const Appointment = require('../models/appointments');


// Create and Save a new Appointment
const create = (req, res) => {

    const { user } = res.locals;
    const { doctor_id, date, time } = req.body;

    // console.log(user);
    console.log(req.body);

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Appointment
    const appointment = new Appointment({
        patient: user._id,
        doctor: doctor_id,
        date: date,
        timing: time
    });

    // Save Appointment in the database
    Appointment.create(appointment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Appointment."
            });
        else res.redirect('/dashboard');
    });
}

module.exports = {
    create
}