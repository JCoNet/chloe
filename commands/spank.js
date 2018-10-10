const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	let id = message.mentions.users.first();
	let spanker = message.author.username;
	message.catch().delete()
	let embed = new Discord.RichEmbed()
		.setTitle("Though hath been spanked!")
		.setDescrtiption(`You have just been spanked <@${id}>`)
		.setColor("#33fede")
		.addField("Spanked by", spanker);
	message.channel.send(embed);

}

module.exports.help ={
  name: "spank"
}