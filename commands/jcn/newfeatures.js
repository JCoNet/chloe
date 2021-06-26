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
        .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
        .setColor('#f59e2c')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTitle("Chloe New Features")
        .setDescription(`JCoNet Development has been hard at work on some new features, here is a rundown of everything that changed in version ${stats.version}!`)
        .addFields(
            {name: "[+] Automated Message toggler", value: "We added a messages command to allow you to toggle the automated messages within your server from Chloe. Admins learn how to use it with the help command.", inline: true},
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