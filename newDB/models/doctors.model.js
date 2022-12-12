const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },

    // location 
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },

    // add connection with users schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;