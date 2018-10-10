const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	let recipient = message.mentions.members.first().id;
	let sender = message.author.id;
	message.delete().catch();
	let embed = new Discord.RichEmbed()
		.setTitle("Spankings")
		.setDescription("Sonebody just got spanked.")
		.addField("Details", `<@${sender}> just spanked <@${recipient}>!!!!`);
	message.channel.send(embed);

}

module.exports.help = {
	name: "spank"
}