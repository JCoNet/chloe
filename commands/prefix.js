const Discord = require('discord.js');
const mongoose = require('mongoose');
const Prefixes = require('../models/prefixes.js');

module.exports.run = async (bot, message, args, useprefix) => {
    await message.delete();

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.");

    Prefixes.findOne({ serverID: message.guild.id }, (err, prefixes) => {
        if (err) console.log(err);

        if (!args[0]) return message.channel.send(`Hello there, you seem to need my help here. Have you tried "${useprefix}prefix <new prefix>" yet?`);
        prefixes.prefix = args[0];
        prefixes.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "prefix"
}