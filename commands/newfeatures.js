const Discord = require('discord.js');
const mysql = require("mysql2/promise");
const config = require("../botconfig.json");
const stats = require("../package.json");

module.exports.run = async (bot, message, args, connection, useprefix) => {

    await message.delete().catch(err => console.log(err));
    if (message.author.id !== config.developer) return message.author.send("You are not allowed to use a JCoNet Developer only command.").catch(err => console.log(err));

    let newfeatEmbed = new Discord.MessageEmbed()
    .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
    .setColor('#f59e2c')
    .setThumbnail(bot.user.displayAvatarURL())
    .setTitle("Chloe New Features")
    .setDescription(`JCoNet Development has been hard at work on some new features, here is a rundown of everything that changed in version ${stats.version}!`)
    .addFields(
        {name: "[+] Set Channels", value: `Admins can now use the set command to change the channels Chloe uses for system, welcome and announcement messages.`, inline: true},
        {name: "[+] Welcome Messages", value: `We can now welcome users to your server. To get this activated please talk to ${stats.author} so that we can make sure the message is how you want it before we enable welcome messages in your server.`, inline: true},
        {name: "[+] New Feature Message", value: "From this version on, when we complete development work, Chloe will send an embed like this to your system channel to let you know what we added (and removed if we removed anything)"},
    )
    .setFooter(`Lead developer: ${stats.author}`);

    let result = await connection.query("SELECT systemChannelID, guildID FROM guildConfig").catch(err => console.log(err));
    let results = result[0];
    var len = results.length;
    console.log(`result: ${result}`);
    console.log(`results: ${results}`);
    console.log(`len: ${len}`);
    for (var i = 0; i < len; i++) {
        sendToGuild = await bot.guilds.cache.get(results[i].guildID)
        let sendTo = await sendToGuildchannels.cache.get(results[i].announcementChannelID);
        // sendTo.send(newfeatEmbed);
        console.log(`results[0]: ${results[0]}`);
        console.log(`sendTo: ${sendTo}`);
    };

};

module.exports.help = {
    name: "newfeatures"
}