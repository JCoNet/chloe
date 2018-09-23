const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
	  let bicon = message.author.displayAvatarURL;
	  let statsembed = new Discord.RichEmbed()
	    .setTitle("User Information")
	    .setDescription("The general information of you.")
	    .setColor("#33fede")
	    .setThumbnail(bicon)
	    .addField("Name", message.author.username)
	    .addField("ID", message.author.id)
	    .addField("Created on", message.author.createdAt);
	  message.channel.send(statsembed);
	} else {
		let bicon = args[0].displayAvatarURL;
		let statsembed = new Discord.RichEmbed()
			.setTitle("User Information")
			.setDescription("The general information of mentioned user.")
			.setColor("#33fede")
			.setThumbnail(bicon)
			.addField("Name", args[0].username)
			.addField("ID", args[0].id)
			.addField("Created on", args[0].createdAt);
		message.channel.send(statsembed);
	}

module.exports.help ={
  name: "userinfo"
}
