const Discord = require("discord.js");

module.exports.run = async (bot, message, args, connection, useprefix) => {

    await message.delete();

    let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Chloe help")
        .setColor("#ff0000")
        .setDescription("A list of all the commands and how to use them.")
        // Regular user commands
        .addField("----{Member Commands}----", " ")
        .addField("Coins", `${useprefix}coins - Displays your coin count.`)
        .addField("Stats", `${useprefix}stats - General information about the bot and how to support it's development.`)
        // Moderator commands
        .addField("----{Staff Commands}----", " ")
        .addField("Clear", `${useprefix}clear <num to delete> - removes set number of messages from chat.`)
        .addField("Mute", `${useprefix}mute @user <time> - Mutes a user for the chosen time.`)
        .addField("Kick", `${useprefix}kick @user <reason> - Kicks the selected user from the server.`)
        .addField("Ban", `${useprefix}ban @user <reason> - Bans the selected user from the server.`)
        .addField("Ping All", `${useprefix}pingall <message> - Send the message with an everyone tag.`)
        // Administrator commands
        .addField("----{Admin Commands}----", " ")
        .addField("Prefix", `${useprefix}prefix <new prefix> - Sets the new prefix for the server.`)
        .addField("Add Role", `${useprefix}addrole @user <role> - Gives the user the role you specified.`)
        .addField("Remove Role", `${useprefix}removerole @user <role> - Removes the user from the role you specified.`);
    message.channel.send(helpEmbed).catch(err => console.log(err));

};

module.exports.help = {
    name: "help"
};