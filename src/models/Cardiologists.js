const mongoose = require("mongoose");
const Cardiologists = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('cardiologists', Cardiologists)