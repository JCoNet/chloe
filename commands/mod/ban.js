module.exports = {
  name: "ban",
  description: "Ban a user!",
  args: true,
  usage: "<user> <reason>",
  async execute(Discord, bot, connection, message, args, useprefix) {
    await message.delete();
    let bUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!bUser) return message.channel.send(`<@!${message.author.id}>, The specified user could not be found.`);
    let bReason = args.join(" ").slice(22);
    if (!bReason) return message.channel.send(`<@!${message.author.id}>, Please provide a reason`);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<@!${message.author.id}>, You have not got the right permissions.`);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<@!${message.author.id}>, That user cannot be banned.`);
  
    let banEmbed = new Discord.MessageEmbed()
        .setTitle("Ban")
        .setDescription("The following ban took place")
        .setColor("#e68a00")
        .addField("Banned User", `${bUser} with the id ${bUser.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    await bUser.send(`You have been banned from ${message.guild.name} for ${bReason}`).catch(err => console.error(err));
    await bUser.ban({days: 7, reason: bReason}).then(message.channel.send({embeds: [banEmbed]})).catch(err => console.error(err));
  
    await connection.query(`INSERT INTO incidents SET serverID = "${message.guild.id}", serverName = "${message.guild.name}", userID = "${bUser.id}", userName = "${bUser.user.username}", type = "BAN", reason = "${bReason}", dateAndTime = "${message.createdAt}", staffID = "${message.author.id}", staffName = "${message.author.username}"`);  
  },
};