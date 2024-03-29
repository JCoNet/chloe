module.exports = {
    name: "warn",
    description: "Warn a user!",
    args: true,
    usage: "<user> <reason>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`Sorry <@!${message.author.id}>, I am not allowed to let non moderator users to run this command.`);
        let wUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!wUser) return message.channel.send(`<@!${message.author.id}>, Please remember to add a target user to the command by either mentioning them or typing out their name. Thank you.`);
        if(wUser.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`<@!${message.author.id}>, I am not authorised to place a warning on the server record of a moderator.`);
        let wReason = args.join(" ").slice(22);
    
        let warnEmbed = new Discord.MessageEmbed()
            .setTitle("Warn")
            .setDescription("The following warning took place")
            .setColor("#e68a00")
            .addField("Warned User", `${wUser} with the id ${wUser.id}`)
            .addField("Time", `${message.createdAt}`)
            .addField("Reason", `${wReason}`);
        await message.channel.send({embeds: [warnEmbed]}).catch(err => console.error(err));
    
        await connection.query(`INSERT INTO incidents SET serverID = "${message.guild.id}", serverName = "${message.guild.name}", userID = "${wUser.id}", userName = "${wUser.user.username}", type = "WARNING", reason = "${wReason}", dateAndTime = "${message.createdAt}", staffID = "${message.author.id}", staffName = "${message.author.username}"`);    
    },
};