const config = require("../../botconfig.json");
const stats = require("../../package.json");

module.exports = {
    name: "newfeatures",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete().catch(err => console.error(err));
        if (message.author.id !== config.developer) return message.author.send("You are not allowed to use a JCoNet Developer only command.").catch(err => console.error(err));

        let newfeatEmbed = new Discord.MessageEmbed()
        .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk')
        .setColor('#f59e2c')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTitle("Chloe New Features")
        .setDescription(`JCoNet Development has been hard at work on some new features, here is a rundown of everything that changed in version ${stats.version}!`)
        .addFields([
            {name: "[*] Threads command", value: "Try out our first thread management command. Use the 'threads add' command in your server today (don't forget your prefix)!", inline: true}
        ])
        .setFooter(`Lead developer: ${stats.author}`);

        let result = await connection.query("SELECT systemChannelID, guildID, newfeatureEnabled FROM guildConfig").catch(err => console.error(err));
        let results = result[0];
        var len = results.length;
        for (var i = 0; i < (len+1); i++) {
            let canSend = await results[i].newfeatureEnabled;
            let sendToGuild = await bot.guilds.cache.get(results[i].guildID);
            let sendTo = await sendToGuild.channels.cache.get(results[i].systemChannelID);
            if (canSend == 1) {
                let sent = await sendTo.send({embeds: [newfeatEmbed]}).catch(err => console.error(err));
                await sent.react(":JCNVerifiedMessage:");
            };
        };
    },
};