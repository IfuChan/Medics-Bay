// create mongoose schema named appointmentSchema

var mongoose = require('mongoose');

const appointments = new mongoose.Schema({

    // connect dummydoctorId to doctorId
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dummydoctors',
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    date: {
        type: Date,
        required: true
    },

    // appointment date
    timing: {
        type: String,
        required: true
    },

    // appointment status
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

});

module.exports = mongoose.model('appointments', appointments);