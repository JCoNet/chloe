const Discord = require("discord.js");
const Incident = require("../models/incidents.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.reply("The specified user could not be found.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You have not got the right permissions.");
    if(bUser.hasPermission("MANAGE_MEMBERS")) return message.reply("That user cannot be banned.");

    let banEmbed = new Discord.RichEmbed()
        .setTitle("Ban")
        .setDescription("The following ban took place")
        .setColor("#e68a00")
        .addField("Banned User", `${bUser} with the id ${bUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    message.guild.member(bUser).ban(bReason).then(message.reply(banEmbed)).catch(err => console.log(err));

    const incident = new Incident({
      _id: mongoose.Types.ObjectId(),
      type: "Ban",
      userName: bUser.user.username,
      userID: bUser.id,
      serverName: message.guild.name,
      serverID: message.guild.id,
      reason: bReason,
      iUsername: message.author.username,
      iID: message.author.id,
      time: message.createdAt
    });

    incident.save().catch(err => console.log(err));
}

module.exports.help = {
  name: "ban"
}