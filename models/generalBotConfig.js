const mongoose = require("mongoose");

const generalBotConfigSchema = mongoose.Schema({
    statusMessage: String,
    statusType: String,
    prefix: String
})

module.exports = mongoose.model("general_bot_config", generalBotConfigSchema);