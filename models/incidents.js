const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
	username: String,
	userID: String,
	reason: String,
	iUsername: String,
	iID: String,
	time: String
});

module.exports = mongoose.model("Incident", incidentSchema);