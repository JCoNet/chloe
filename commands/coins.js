const Discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../models/money.js');

module.exports.run = async (bot, message, args) => {
    await message.delete();

    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
        if (err) console.log(err);
        let embed = new Discord.RichEmbed()
            .setTitle("Coins")
            .setColor("#aa7ce2")
            .setThumbnail(message.author.displayAvatarURL);
        if (!money) {
            embed.addField("Coins", "None", true);
            return message.channel.send(embed);
        } else {
            embed.addField("Coins", money.money, true);
            return message.channel.send(embed);
        }
    })
}

module.exporets.help = {
    name: "coins"
}