const Discord = require("discord.js");

module.exports.run = async (bot, message, args, useprefix) => {

    await message.delete();

    let helpEmbed = new Discord.RichEmbed()
        .setTitle("Chloe help")
        .setColor("#ff0000")
        .setDescription("A list of all the commands and how to use them.")
        .addField("Coins", `${useprefix}coins - Displays your coin count. (Regular user)`)
        .addField("Report", `${useprefix}report @user <reason> - Reports a user for rule breaking annonomously to staff. (Regular user)`)
        .addField("Stats", `${useprefix}stats - General information about the bot and how to support it's development. (Regular user)`)
        .addField("Clear", `${useprefix}clear <num to delete> - removes set number of messages from chat. (Staff)`)
        .addField("Mute", `${useprefix}mute @user <time> - Mutes a user for the chosen time. (Staff)`)
        .addField("Kick", `${useprefix}kick @user <reason> - Kicks the selected user from the server. (Staff)`)
        .addField("Ban", `${useprefix}ban @user <reason> - Bans the selected user from the server. (Staff)`)
        .addField("Prefix", `${useprefix}prefix <new prefix> - Sets the new prefix for the server. (Admin)`);
    message.reply(banEmbed).catch(err => console.log(err));

};

module.exports.help = {
    name: "help"
};