const Discord = require("discord.js");
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection, useprefix) => {
  await message.delete();
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("This command due to it's nature can only be run by a guild admin.");
  let defaultChannel = message.guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
  await connection.query(`UPDATE guildConfig SET twitchChannelName = "${defaultChannel.name}", twitchChannelID = "${defaultChannel.id}" WHERE guildID = "${message.guild.id}"`).catch(err => console.log(err));
  message.channel.send("Guild updated and now utilising new features.");
  // message.channel.send("You are not required to run this command, no changes have been made to the database.").then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
};

module.exports.help = {
  name: "updateguild"
}