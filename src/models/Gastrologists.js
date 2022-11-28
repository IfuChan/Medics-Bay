const mongoose = require("mongoose");
const Gastrologists = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('gastrologists', Gastrologists)