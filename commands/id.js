const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  let tempSelection = msg.mentions.members.first();
  message.delete().catch();
  message.channel.send(`Here is a random number: ${tempSelection.id}`);
}

module.exports.help ={
  name: "say"
}
