const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	message.catch().delete();
	message.channel.reply("We are implimenting this feature currently... Please be patient with our developers.")

}

module.exports.help ={
  name: "coin"
}