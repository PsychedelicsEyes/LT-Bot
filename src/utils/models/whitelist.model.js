const mongoose = require("mongoose");

module.exports = mongoose.model('whitelist', new mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    wlby: {type: String, required: true},
    timestamp: {type: Date, required: false, default: new Date()}
}))