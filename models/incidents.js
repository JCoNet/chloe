const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
	userName: String,
	userID: String,
	serverName: String,
	serverID: String,
	reason: String,
	iUsername: String,
	iID: String,
	time: String
});

module.exports = mongoose.model("Incident", incidentSchema);