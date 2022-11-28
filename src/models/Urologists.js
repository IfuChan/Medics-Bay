const mongoose = require("mongoose");
const Urologists = new mongoose.Schema({
    department: String,
    description: String
})

module.exports = mongoose.model('urologists', Urologists)