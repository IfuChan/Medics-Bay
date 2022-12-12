const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    dateOfBirth: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;