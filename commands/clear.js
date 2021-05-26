const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("OOF. You do not appear to have access to this command, you need to be able to manage messages to do this!");
  if (!args[0]) return message.reply("You did not specify messages to delete.");
  let toDelete = Math.floor(parseInt(args[0])+1);
  // console.log(toDelete)
  message.channel.bulkDelete(toDelete).then(() => {
    message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
  });
}

module.exports.help = {
  name: "clear"
}
