const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    timing: {
        type: Date,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;