const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const credentialSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

credentialSchema.pre('save', async function (next) {
    if (this.isModified('password') && (this.password = await bcrypt.hash(this.password, 8))) {
        next();
    }
});

const Credential = mongoose.model('credentials', credentialSchema);

module.exports = Credential;