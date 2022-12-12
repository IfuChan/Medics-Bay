const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'male',
    },
    type: {
        type: String,
        enum: ['Admin', 'patient', 'doctor'],
        default: 'patient',
    },

    // add credentials
    credential: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'credentials',
    }

});

const User = mongoose.model('users', userSchema);

module.exports = User;