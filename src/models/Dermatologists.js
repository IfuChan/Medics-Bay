const mongoose = require("mongoose");
const Dermatologists = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('dermatologists', Dermatologists)