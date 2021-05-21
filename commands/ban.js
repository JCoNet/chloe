const Discord = require("discord.js");
// const Incident = require("../models/incidents.js");
// const mongoose = require("mongoose");
// const Connection = require("mysql/lib/Connection");

module.exports.run = async (bot, message, args, connection) => {
  await message.delete();
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!bUser) return message.reply("The specified user could not be found.");
  let bReason = args.join(" ").slice(22);
  if (!bReason) return message.reply("Please provide a reason");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You have not got the right permissions.");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.reply("That user cannot be banned.");

  let banEmbed = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setDescription("The following ban took place")
      .setColor("#e68a00")
      .addField("Banned User", `${bUser} with the id ${bUser.id}`)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);
  await bUser.send(`You have been banned from ${message.guild.name} for ${bReason}`).catch(err => console.log(err));
  await bUser.ban({reason: bReason}).then(message.channel.send(banEmbed)).catch(err => console.log(err));

  // const incident = new Incident({
  //   _id: mongoose.Types.ObjectId(),
  //   type: "Ban",
  //   userName: bUser.user.username,
  //   userID: bUser.id,
  //   serverName: message.guild.name,
  //   serverID: message.guild.id,
  //   reason: bReason,
  //   iUsername: message.author.username,
  //   iID: message.author.id,
  //   time: message.createdAt
  // });

  // await incident.save().catch(err => console.log(err));

  connection.query(`INSERT INTO (serverID, serverName, userID, userName, type, reason, dateAndTime, staffID, staffName) VALUES '${message.guild.id}', '${message.guild.name}', '${bUser.id}', '${bUser.user.username}', 'BAN', '${bReason}', '${message.createdAt}', '${message.author.id}', '${message.author.username}'`, function(err, result) {
    if (err) console.log(err);
  });


};

module.exports.help = {
  name: "ban"
}