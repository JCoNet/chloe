const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let sender = message.author.username();
	let id = message.mentions.users.first().id;
  	let message = args.join(" ").slice(22);
  	message.delete().catch();
  	let embed = new Discord.RichEmbed()
  		.setTitle("Michelle Mail")
  		.setDescription("The user messaging system through the bot.")
  		.setColor("#00ff00")
  		.addField("To", "You")
  		.addField("From", sender)
  		.addField("Message", message)
  	id.send(embed);
}

module.exports.help ={
  name: "mail"
}
