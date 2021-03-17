const Discord = require("discord.js");
const Incident = require("../models/incidents.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    console.log("test1 pass");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    console.log(`bUser returns: ${bUser}`);
    console.log("test2 pass");
    if (!bUser) return message.reply("The specified user could not be found.");
    console.log("test3 pass");
    let bReason = args.join(" ").slice(22);
    console.log("test4 pass");
    if (!bReason) return message.reply("Please provide a reason");
    console.log("test5 pass");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You have not got the right permissions.");
    console.log("test6 pass");
    if(message.guild.member(bUser).hasPermission("MANAGE_MEMBERS")) return message.reply("That user cannot be banned.");
    console.log("test7 pass");

    let banEmbed = new Discord.MessageEmbed()
        .setTitle("Ban")
        .setDescription("The following ban took place")
        .setColor("#e68a00")
        .addField("Banned User", `${bUser} with the id ${bUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    console.log("test8 pass");
    await message.guild.member(bUser).send(`You have been banned from ${message.guild.name} for ${bReason}`).catch(err => console.log(err));
    console.log("test9 pass");
    message.guild.member(bUser).ban(bReason).then(message.channel.send(banEmbed)).catch(err => console.log(err));
    console.log("test10 pass");

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
    console.log("test11 pass");

    incident.save().catch(err => console.log(err));
    console.log("test12  pass");
}

module.exports.help = {
  name: "ban"
}