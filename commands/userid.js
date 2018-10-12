const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.author.id != "415067295715557376") return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  let tempSelection = message.mentions.members.first();
  message.delete().catch();
  message.channel.send(`Here is a random number: ${tempSelection.id}`);
}

module.exports.help ={
  name: "userid"
}
