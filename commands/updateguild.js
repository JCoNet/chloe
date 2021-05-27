const Discord = require("discord.js");
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection) => {
  await message.delete();
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("This command due to it's nature can only be run by a guild admin.");
  let defaultChannel = message.guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
  let sysChannel = message.guild.sysChannel;
  let sysChannelName;
  let sysChannelID;
  if (!sysChannel) {
    sysChannelName = defaultChannel.name;
    sysChannelID = defaultChannel.id;
  } else {
    sysChannelName = message.guild.sysChannel.name;
    sysChannelID = message.guild.sysChannel.id;
  };
  await connection.query(`INSERT INTO guildConfig SET guildName = "${message.guild.name}", guildID = "${message.guild.id}", prefix = "chloe/", ownerName = "${message.guild.owner.user.username}", ownerID = "${message.guild.owner.user.id}", systemChannelName = "${sysChannelName}", systemChannelID = "${sysChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  message.channel.send("Guild updated and now utilising new features.");
};

module.exports.help = {
  name: "updateguild"
}