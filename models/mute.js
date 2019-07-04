const mongoose = require("mongoose");

const muteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	username: String,
	userID: String,
	duration: String,
	mUsername: String,
	mID: String,
	time: String
});

module.exports = mongoose.model("Mute", muteSchema);