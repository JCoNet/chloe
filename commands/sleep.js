const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  message.delete().catch();
  message.channel.send(`Shutting down to 10% processing power, goodnight ${message.guild.name}.`);
}

module.exports.help ={
  name: "sleep"
}