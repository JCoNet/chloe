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
            {name: "[*] Threads command", value: "Try out our first thread management command. Use the 'threads add' command in your server today (don't forget your prefix)!", inline: true},
            {name: "[*] Verified Message Reaction", value: "If you start seeing one of three messages sent in your server as a reaction don't worry, we are telling you what they mean. <a:JCNVerifiedMessage:872672152313294858> will be added to any system messages sent by the bot to your server. <:JCNVerifiedDeveloper:872672468765118544> will be added to messages resulting from commands sent by one of our verified developrs. <a:JCNVerifiedMember:872672537400737802> will be added to the messages resulting from commands sent by one of our verified members. We would add this to any message they sent however this would but strain on our bot we do not need. So whenever you seen an embed, it should say sent by <username> and show these emojis if from a verified developer, verified member or our system", inline: true}
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
                await sent.react("<a:JCNVerifiedMessage:872672152313294858>");
            };
        };
    },
};