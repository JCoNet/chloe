const Discord = require('discord.js');
const mongoose = require('mongoose');
const Prefixes = require('../models/prefixes.js');

module.exports.run = async (bot, message, args, useprefix) => {
    await message.delete();

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.");

    Prefixes.findOne({ serverID: message.guild.id }, (err, prefixes) => {
        if (err) console.log(err);

        if (!args[0] || args[0 == help]) return message.reply(`Hello there, you seem to need my help here. Have you tried "${useprefix}prefix <new prefix> yet?"`);

        const newPrefix = new Prefixes({
            prefix: args[0]
        });
        newPrefix.save().catch(err => {
            if (err) console.log(err);
        })
    })
}

module.exports.help = {
    name: "prefix"
}