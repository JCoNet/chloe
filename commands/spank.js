const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	// if (message.author.id != "415067295715557376" || message.author.id != "481872616508882944") return message.reply("You idiot, that command is for legends only!");

	// if (!message.member.id.some(x => ["415067295715557376", "481872616508882944"].includes(x.id))) return message.reply("You idiot, that command is for legends only!");
	
	let ids = ["415067295715557376","481872616508882944"];
	if (!ids.includes(message.author.id));

	let recipient = message.mentions.members.first().id;
	let sender = message.author.idreturn message.reply("You idiot, that command is for legends only!");

	message.delete().catch();
	let embed = new Discord.RichEmbed()
		.setTitle("Spankings")
		.setDescription("Somebody just got spanked.")
		.addField("Details", `<@${sender}> just spanked <@${recipient}>!!!!`);
	message.channel.send(embed);

}

module.exports.help = {
	name: "spank"
}