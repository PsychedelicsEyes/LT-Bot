const mongoose = require("mongoose");

module.exports = mongoose.model('blUser', new mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    blBy: {type: String, required: true},
    reason: {type: String, required: false, default: "Aucune raison spécifiée"},
    timestamp: {type: Date, required: false, default: new Date()}
}))