const Appointment = require('../models/appointments');


// Create and Save a new Appointment
const create = (req, res) => {

    const { user } = res.locals;
    var { doctor_id, date, time } = req.body;

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // date must be greater than today
    var today = new Date();
    var appointmentDate = new Date(date);

    if (appointmentDate < today) {
        return res.status(400).send({
            message: "Date must be greater than today!"
        });
    }

    // check if doctor is available on that date and time
    Appointment.find({ doctor: doctor_id, date: date, timing: time }, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `No Appointment found with doctor id ${doctor_id}.`
                });
            }

            return res.status(500).json({
                message: "Something went wrong",
            });
        }

        if (data.length !== 0) {
            return res.status(400).json({
                message: "Doctor is not available on that date and time!"
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
            if (err) {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Appointment."
                });
            }
            return res.redirect('/dashboard');
        });
    });

}

module.exports = {
    create
}