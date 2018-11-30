const Discord = require("discord.js");
const Report = require("../models/report.js");
const mongoose = require('mongoose');

module.exports.run = async (bot, message, args) => {

    await message.delete();

    mongoose.connect(`mongodb+srv://alessa:${process.env.databasePassword}@cluster0-sltlx.mongodb.net/alessa`);

    let rUser = message.mentions.members.first();
    if (!rUser) return message.reply("Sorry, but I cannot find any user by that name.");
    let rReason = args.slice(1).join(" ");
    if (!rReason) return message.reply("Sorry, but I cannot report someone without a reason being provided.");

    const report = new Report({

        _id: mongoose.Types.ObjectId(),
        username: rUser.user.username,
        userID: rUser.id,
        reason: rReason,
        rUsername: message.author.username,
        rID: message.author.id,
        time: message.createdAt

    });

    report.save()
    .then(result => console.log(result))
    .catch(err => confirm.log(err));

    message.reply("Thank you for reporting, that has been saved to my database for future use.");

};

module.exports.help = {
    name: "report"
};