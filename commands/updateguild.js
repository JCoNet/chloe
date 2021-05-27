const Discord = require("discord.js");
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection) => {
  await message.delete();
  let defaultChannel = await message.guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
  await connection.query(`INSERT INTO guildConfig SET guildName = "${message.guild.name}", guildID = "${message.guild.id}", prefix = "chloe/", ownerName = "${message.guild.owner.username}", ownerID = "${message.guild.ownerID}", systemChannelName = "${message.guild.systemChannel}", systemChannelID = "${message.guild.systemChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  await message.channel.send("Guild updated and now utilising new features.");
};

module.exports.help = {
  name: "updateguild"
}