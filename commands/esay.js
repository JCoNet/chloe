const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  let botmessage = args.join(" ");
  message.delete().catch();
  let embed = new Discord.RichEmbed()
		.setTitle("AI Chat")
		.setColor("#00ff00")
		.addField("Message", botmessage);
  message.channel.send(embed);
}

module.exports.help ={
  name: "esay"
}