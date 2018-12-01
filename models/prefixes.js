const mongoose = require("mongoose");

const prefixesSchema = mongoose.Schema({
    serverID: String,
    serverName: String,
    prefix: String
})

module.exports = mongoose.model("Prefixes", prefixesSchema);