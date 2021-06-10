const Discord = require("discord.js");
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection) => {
  await message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!kUser) return message.reply("The specified user could not be found.");
    let kReason = args.join(" ").slice(22);
    if (!kReason) return message.reply("Please provide a reason");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You have not got the right permissions.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("That user cannot be kicked.");

    let kickEmbed = new Discord.MessageEmbed()
        .setTitle("Kick")
        .setDescription("The following kick took place")
        .setColor("#e68a00")
        .addField("Kicked User", `${kUser} with the id ${kUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
    await kUser.send(`You have been kicked from ${message.guild.name} for ${kReason}`).catch(err => console.log(err));
    await kUser.kick(kReason).then(message.channel.send(kickEmbed)).catch(err => console.log(err));
    
  await connection.query(`INSERT INTO incidents SET serverID = "${message.guild.id}", serverName = "${message.guild.name}", userID = "${kUser.id}", userName = "${kUser.user.username}", type = "KICK", reason = "${kReason}", dateAndTime = "${message.createdAt}", staffID = "${message.author.id}", staffName = "${message.author.username}"`);

};

module.exports.help = {
  name: "kick"
}