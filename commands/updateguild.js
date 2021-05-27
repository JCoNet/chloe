const Discord = require("discord.js");
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection) => {
  await message.delete();
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("This command due to it's nature can only be run by a guild admin.");
  let defaultChannel = await message.guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
  await connection.query(`INSERT INTO guildConfig SET guildName = "${message.guild.name}", guildID = "${message.guild.id}", prefix = "chloe/", ownerName = "${message.guild.owner.user.username}", ownerID = "${message.guild.owner.user.id}", systemChannelName = "${message.guild.systemChannel.name}", systemChannelID = "${message.guild.systemChannel.id}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  await message.channel.send("Guild updated and now utilising new features.");
};

module.exports.help = {
  name: "updateguild"
}