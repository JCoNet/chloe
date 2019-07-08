const Discord = require("discord.js");
const Mute = require("../models/mute.js");
const mongoose = require("mongoose");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("The specified user could not be found.");
    let duration = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You have not got the right permissions.");
    if(mUser.hasPermission("MANAGE_MEMBERS")) return message.reply("That user cannot be muted.");

    let muteEmbed = new Discord.RichEmbed()
        .setTitle("Ban")
        .setDescription("The following ban took place")
        .setColor("#e68a00")
        .addField("Banned User", `${bUser} with the id ${bUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    message.guild.member(bUser).ban(bReason).then(message.reply(banEmbed)).catch(err => console.log(err));

    const incident = new Incident({
      _id: mongoose.Types.ObjectId(),
      type: "Mute",
      username: kUser.user.username,
      userID: mUser.id,
      reason: "muted",
      iUsername: message.author.username,
      iID: message.author.id,
      time: message.createdAt
    });

    incident.save().catch(err => console.log(err));
}

module.exports.help = {
  name: "ban"
}