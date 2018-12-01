const mongoose = require("mongoose");

const prefixSchema = mongoose.Schema({
    serverID: String,
    serverName: String,
    prefix: String
})

module.exports = mongoose.model("Prefixes", prefixesSchema);