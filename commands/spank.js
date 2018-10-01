const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	let id = message.mentions.users.first().id;
	let recepient = bot.users.get(id);
	let embed = new Discord.RichEmbed()
		.setTitle("Though hath been spanked!")
		.setDescrtiption(`You have just been spanked <@${recepeint}>`)
		.addField("Spanked by", message.author.username)
	message.catch().delete()
	message.channel.send(embed)

}

module.exports.help ={
  name: "spank"
}