const Discord = require("discord.js");
const Warning = require("../models/warnings.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, I am not allowed to let non moderator users to run this command.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.reply("Please remember to add a target user to the command by either mentioning them or typing out their name. Thank you.");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("I am not authorised to place a warning on the server record of a moderator.");
    let reason = args.join(" ").slice(22);

    

};

module.exports.help = {
    name: "warn"
};

// Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
//     if (err) console.log(err);
//     let embed = new Discord.RichEmbed()
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

    // userName: String,
	// userID: String,
	// serverName: String,
	// serverID: String,
    // reason: String,
    // warningNumber: String,
	// iUsername: String,
	// iID: String,
	// time: String