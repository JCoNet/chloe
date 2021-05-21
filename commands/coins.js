const Discord = require('discord.js');
// const mongoose = require('mongoose');
// const Connection = require('mysql/lib/Connection');
// const Money = require('../models/money.js');

module.exports.run = async (bot, message, args, connection) => {
    await message.delete();

    // Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
    //     if (err) console.log(err);
    //     let embed = new Discord.MessageEmbed()
    //         .setTitle("Coins")
    //         .setColor("#aa7ce2")
    //         .setDescription(`Coin Balance for ${message.author.username} on ${message.guild.name}.`)
    //         .setThumbnail(message.author.displayAvatarURL);
    //     if (!money) {
    //         embed.addField("Coins", 0, true);
    //         return message.channel.send(embed);
    //     } else {
    //         embed.addField("Coins", money.money, true);
    //         return message.channel.send(embed);
    //     }
    // })

    connection.query(`SELECT coins FROM money WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`, function(err, result) {
        if (err) console.log(err);
        let embed = new Discord.MessageEmbed()
            .setTitle("Coins")
            .setColor("#aa7ce2")
            .setDescription(`Coin Balance for ${message.author.username} on ${message.guild.name}.`)
            .setThumbnail(message.author.displayAvatarURL);
        if(!result[0]) {
            embed.addField("Total", 0, true);
            return message.channel.send(embed);
        } else {
            embed.addField("Coins", result[0].coins, true);
            return message.channel.send(embed);
        };
    });

}

module.exports.help = {
    name: "coins"
}