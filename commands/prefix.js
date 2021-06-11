const Discord = require('discord.js');
const mysql = require("mysql2/promise");

module.exports.run = async (bot, message, args, connection, disbut, useprefix) => {
    await message.delete();

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.");

    if (!args[0]) return message.channel.send(`Hello there, you seem to need my help here. Have you tried "${useprefix}prefix <new prefix>" yet?`);

    await connection.query(`UPDATE prefixes SET prefix = "${args[0]}" WHERE guildID = "${message.guild.id}"`);

};

module.exports.help = {
    name: "prefix"
}