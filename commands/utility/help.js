module.exports = {
    name: "help",
    description: "A list of commands for you!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        let helpEmbed = new Discord.MessageEmbed()
            .setTitle("Chloe help")
            .setColor("#ff0000")
            .setDescription("A list of all the commands and how to use them.")
            .setThumbnail(bot.user.displayAvatarURL())
            .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk')
            .setFooter("New commands are developed and added frequently.")
            .addFields([
                {name: "User Commands", value: '\u200B', inline: false},
                {name: `${useprefix}coins`, value: "Displays your coin balance for this server.", inline: true},
                {name: `${useprefix}stats`, value: "General information about the bot and how to support it's development.", inline: true},
                {name: `${useprefix}help`, value: "Displays a list of commands that you can use in the server for 1 minute.", inline: true},
                {name: `${useprefix}yeet @user`, value: "Throw a user a randomly generated distance for 25 of the coins you acquired in this server.", inline: true},
            ]);
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            helpEmbed.addFields([
                {name: "Moderator Commands", value: '\u200B', inline:false},
                {name: `${useprefix}clear <num to delete>`, value: "removes set number of messages from chat.", inline: true},
                {name: `${useprefix}pingall <message>`, value: "Send the message as Chloe with an everyone tag.", inline: true},
                {name: `${useprefix}say <message>`, value: "Send a message as Chloe.", inline: true},
                {name: `${useprefix}warn @user <reason>`, value: "Warns the selected user in the server.", inline: true},
            ]);
        };
        if (message.member.permissions.has("KICK_MEMBERS")) {
            helpEmbed.addField(`${useprefix}kick @user <reason>`, "Kicks the selected user from the server.", true);
        };
        if (message.member.permissions.has("BAN_MEMBERS")) {
            helpEmbed.addField(`${useprefix}ban @user <reason>`, "Bans the selected user from the server.", true);
        };
        if (message.member.permissions.has("ADMINISTRATOR")) {
            helpEmbed.addFields([
                {name: "\u200B", value: '\u200B', inline:false},
                {name: "Administrator Commands", value: "\u200B", inline: false},
                {name: `${useprefix}updateguild`, value: "Updates our database about info regarding your server. [only run when bot tells you to]", inline: true},
                {name: `${useprefix}set`, value: "Will start the configurator for message channels using the channel it is run in as the channel you want the message channel set to.", inline: true},
                {name: `${useprefix}messages`, value: "Allows you to enable/disable the automated messages Chloe sends in your server.", inline: true},
                {name: `${useprefix}prefix <new prefix>`, value: "Sets the new prefix for the server", inline: true},
            ]);
        };
            
        message.channel.send({embeds: [helpEmbed]}).then(msg => setTimeout(() => msg.delete(), 60000)).catch(err => console.error(err));
    },
};