const mongoose = require("mongoose");

const schema = mongoose.Schema({
    fullname: String,
    dateofbirth: String,
    vin: String,
    token: String,
    benefited: { type: Boolean, default: false }
})

module.exports = mongoose.model('Ticket', schema)