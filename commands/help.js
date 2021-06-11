const Discord = require("discord.js");

module.exports.run = async (bot, message, args, connection, useprefix) => {

    await message.delete();

    let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Chloe help")
        .setColor("#ff0000")
        .setDescription("A list of all the commands and how to use them.")
        .setThumbnail(bot.user.displayAvatarURL())
        .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
        .setFooter("New commands are developed and added frequently.")
        .addFields(
            {name: "User Commands", value: '\u200B', inline: false},
            {name: `${useprefix}coins`, value: "Displays your coin balance for this server.", inline: true},
            {name: `${useprefix}stats`, value: "General information about the bot and how to support it's development.", inline: true},
            {name: `${useprefix}help`, value: "Displays a list of commands that you can use in the server for 1 minute.", inline: true},
        )
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        helpEmbed.addFields(
            {name: "Moderator Commands", value: '\u200B', inline:false},
            {name: `${useprefix}clear <num to delete>`, value: "removes set number of messages from chat.", inline: true},
            {name: `${useprefix}pingall <message>`, value: "Send the message as Chloe with an everyone tag.", inline: true},
            {name: `${useprefix}say <message>`, value: "Send a message as Chloe.", inline: true},
            {name: `${useprefix}warn @user <reason>`, value: "Warns the selected user in the server.", inline: true},
        )
    }
    if (message.member.hasPermission("KICK_MEMBERS")) {
        helpEmbed.addField(`${useprefix}kick @user <reason>`, "Kicks the selected user from the server.", true)
    };
    if (message.member.hasPermission("BAN_MEMBERS")) {
        helpEmbed.addField(`${useprefix}ban @user <reason>`, "Bans the selected user from the server.", true)
    };
    if (message.member.hasPermission("ADMINISTRATOR")) {
        helpEmbed.addFields(
            {name: "Administrator Commands", value: "\u200B", inline: false},
            {name: `${useprefix}updateguild`, value: "Updates our database about info regarding your server. [only run when bot tells you to]", inline: true},
            {name: `${useprefix}set`, value: "Will start the configurator for message channels using the channel it is run in as the channel you want the message channel set to.", inline: true},
            {name: `${useprefix}prefix <new prefix>`, value: "Sets the new prefix for the server", inline: true},
            {name: `${useprefix}addrole @user <role>`, value: "Gives the user the role you specified. [currently disabled in all servers]", inline: true},
            {name: `${useprefix}removerole @user <role>`, value: "Removes the user from the role you specified. [currently disabled in all servers]", inline: true},
        )
    };
        
    message.channel.send(helpEmbed).then(msg => msg.delete({timeout: 60000})).catch(err => console.log(err));

};

module.exports.help = {
    name: "help"
};