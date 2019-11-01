const Discord = require("discord.js");
const Incident = require("../models/incidents.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {
  await message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.reply("The specified user could not be found.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You have not got the right permissions.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("That user cannot be kicked.");

    let kickEmbed = new Discord.RichEmbed()
        .setTitle("Kick")
        .setDescription("The following kick took place")
        .setColor("#e68a00")
        .addField("Kicked User", `${kUser} with the id ${kUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
    message.guild.member(kUser).kick(kReason).then(message.reply(kickEmbed)).catch(err => console.log(err));

    const incident = new Incident({
      _id: mongoose.Types.ObjectId(),
      type: "Kick",
      username: kUser.user.username,
      userID: kUser.id,
      serverName: message.guild.id,
      serverID: message.guild.name,
      reason: kReason,
      iUsername: message.author.username,
      iID: message.author.id,
      time: message.createdAt
    });

    incident.save().catch(err => console.log(err));
}

module.exports.help = {
  name: "kick"
}