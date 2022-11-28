const mongoose = require("mongoose");
const Psychiatrists = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('psychiatrists', Psychiatrists)