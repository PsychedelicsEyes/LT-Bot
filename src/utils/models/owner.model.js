const mongoose = require("mongoose");

module.exports = mongoose.model('owner', new mongoose.Schema({
    _id: {type: String, required: true},
    addby: {type: String, required: true},
    timestamp: {type: Date, required: false, default: new Date()}
}))