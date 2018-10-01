const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	let id = message.mentions.users.first().id;
	let embed = new Discord.RichEmbed()
		.setTitle("Though hath been spanked!")
		.setDescrtiption(`You have just been spanked <@${id}>`)
		.addField("Spanked by", message.author.username);
	message.channel.send(embed);

}

module.exports.help ={
  name: "spank"
}