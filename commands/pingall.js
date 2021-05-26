const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  let botmessage = args.join(" ");
  await message.delete().catch(err => console.log(err));
  message.channel.send(`@everyone ${botmessage}`);
}

module.exports.help ={
  name: "pingall"
}