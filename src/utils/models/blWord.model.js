const mongoose = require("mongoose");

module.exports = mongoose.model('blWord', new mongoose.Schema({
    word: {type: String, required: true},
    blBy: {type: String, required: true},
    timestamp: {type: Date, required: false, default: new Date()}
}))