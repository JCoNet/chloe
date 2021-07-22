const config = require("../../botconfig.json");
const stats = require("../../package.json");

module.exports = {
    name: "cleanup",
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
            {name: "[+] Twitch live notifications [alpha]", value: "We added twitch api to Chloe to enable go live notifications in the alpha form of the feature. As this is an alpha feature it is only set up for one user and one server selected due to their massive support of this project. This feature will be adapted and modified to bring it to the beta as soon as possible.", inline: true}
        )
        .setFooter(`Lead developer: ${stats.author}`);

        let result = await connection.query("SELECT guildName, guildID FROM guildConfig").catch(err => console.error(err));
        let results = result[0];
        var len = results.length;
        for (var i = 0; i < (len); i++) {
            let checkGuild = await bot.guilds.cache.get(results[i].guildID);
            console.log(checkGuild);
            if (checkGuild == undefined) {
                connection.query(`DELETE FROM guildConfig WHERE guildID = '${results[i].guildID}'`).catch(err => console.error(err));
                connection.query(`DELETE FROM money WHERE guildID = '${results[i].guildID}'`).catch(err => console.error(err));
                connection.query(`DELETE FROM incidents WHERE guildID = '${results[i].guildID}'`).catch(err => console.error(err));
                message.channel.send(`Not in ${results[i].guildName} anymore, deleted record from database.`)
            }
        };
    },
};