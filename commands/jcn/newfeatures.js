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
        .addFields(
            {name: "[+] Automated blacklist word ban", value: "To protect servers we monitor from certain words we have enabled a blacklist that automatically bans any users that say the words within it. To view the blacklist please message JCoDog.", inline: true},
            {name: "[!] Ban configuration", value: "Previously any bans this bot did were not removing any messages. So we updated the ban configuration to now delete the last 7 days of messages from the banned user be it manual or automated ban. 7 days is the most we can delete when banning a user through the discord api.", inline: true},
        )
        .setFooter(`Lead developer: ${stats.author}`);

        let result = await connection.query("SELECT systemChannelID, guildID, newfeatureEnabled FROM guildConfig").catch(err => console.error(err));
        let results = result[0];
        var len = results.length;
        for (var i = 0; i < len; i++) {
            let canSend = await results[i].newfeatureEnabled;
            let sendToGuild = await bot.guilds.cache.get(results[i].guildID);
            let sendTo = await sendToGuild.channels.cache.get(results[i].systemChannelID);
            if (canSend == 1) {
                sendTo.send(newfeatEmbed).catch(err => console.error(err));;
            };
        };
    },
};