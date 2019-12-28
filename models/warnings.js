const mongoose = require("mongoose");

const warningSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	userName: String,
	userID: String,
	serverName: String,
	serverID: String,
    reason: String,
    warningNumber: Number,
	iUsername: String,
	iID: String,
	time: String
});

module.exports = mongoose.model("Warning", warningSchema);