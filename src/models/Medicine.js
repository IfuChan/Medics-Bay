const mongoose = require("mongoose");
const Medicine = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('medicine', Medicine)