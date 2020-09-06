const Discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../models/money.js');

module.exports.run = async (bot, message, args) => {
    await message.delete();

    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
        if (err) console.log(err);
        let embed = new Discord.MessageEmbed()
            .setTitle("Coins")
            .setColor("#aa7ce2")
            .setDescription(`Coin Balance for ${message.author.username} on ${message.guild.name}.`)
            .setThumbnail(message.author.displayAvatarURL);
        if (!money) {
            embed.addField("Coins", 0, true);
            return message.channel.send(embed);
        } else {
            embed.addField("Coins", money.money, true);
            return message.channel.send(embed);
        }
    })
}

module.exports.help = {
    name: "coins"
}