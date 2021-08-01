module.exports = {
    name: "prefix",
    description: "Change the guild prefix!",
    args: true,
    usage: "<new prefix>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Unfortunately <@!${message.author.id}>, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.`);
    
        if (!args[0]) return message.channel.send(`Hello there, you seem to need my help here. Have you tried "${useprefix}prefix <new prefix>" yet?`);
    
        await connection.query(`UPDATE guildConfig SET prefix = "${args[0]}" WHERE guildID = "${message.guild.id}"`).catch(err => console.error(err));
    
        let check = message.guild.iconURL();
        let serverIcon;
        if (!check) {
            serverIcon = "https://jconet.co.uk/resources/JCN.png";
        } else {
            serverIcon = check;
        };
    
        let prefixEmbed = new Discord.MessageEmbed()
        .setAuthor(`${memssage.guild.name}`, `${serverIcon}`)
        .setTitle("Guild Prefix")
        .setDescription("The guild prefix has been changed!")
        .addFields([
            {name: "Old prefix", value: `${useprefix}`, inline: true},
            {name: "New prefix", value: `${args[0]}`, inline: true},
        ])
        .setFooter(`To change again please do ${args[0]}prefix <newprefix>`);
    
        message.channel.send({embeds: [prefixEmbed]}).then(msg => msg.delete({timeout: 120000})).catch(err => console.error(err));
    },
};