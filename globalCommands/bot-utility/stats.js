const stats = require("../../package.json");

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("View the information of this bot"),

    async execute (interaction) {
        // Code to run when executed.
        let useprefix;

        let result = await interaction.client.database.query(`SELECT prefix FROM guildConfig WHERE guildID = "${interaction.guild.id}"`).catch(err => console.error(err));
        let results = result[0];
        if (results.length == 0) {
        useprefix = botConf[0].defaultPrefix;
        updated = "no";
        } else {
        useprefix = results[0].prefix;
        updated = "yes";
        };

        let bicon = bot.user.displayAvatarURL(true);
        let owner = await interaction.guild.fetchOwner();
        let statsembed = new Discord.MessageEmbed()
        .setTitle("Bot Statistics")
        .setDescription(stats.description)
        .setColor("#33fede")
        .setThumbnail(bicon)
        .addFields([
            {name: "Name", value: `${bot.user.username}`, inline: true},
            {name: "Created on", value: `${bot.user.createdAt}`, inline: true},
            {name: "Current version", value: `${stats.version}`, inline: true},
            {name: "Running On", value: `JCoNet BotFramework Version: ${stats.frmwrk}`, inline: true},
            {name: "Guild count", value: `${bot.guilds.cache.size}`, inline: true},
            {name: '\u200B', value: '\u200B', inline: false},
            {name: "This guild name", value: `${interaction.guild.name}`, inline: true},
            {name: "This guild prefix", value: `${useprefix}`, inline: true},
            {name: "This guild owner", value: `${owner.user.username}`, inline: true},
            {name: '\u200B', value: '\u200B', inline: false},
            {name: "Save on online retail and support JCoNet!", value: '[Get Honey](https://www.joinhoney.com/ref/k4lomc4 "Get the Honey Extension and start saving on all your online purchases.")', inline: true},
            {name: "Support JCoNet another way!", value: '[Donate Here](https://www.buymeacoffee.com/jconet "Donate to JCoNet via our third party partner BMAC")', inline: true},
            {name: "Affiliated with Streamlabs OBS", value: '[Get Streamlabs OBS Today](https://streamlabs.com/slobs/d/1789520 "Get Streamlabs OBS via our link to get the best streaming software and support future JCoNet streams and development.")', inline: true},
            {name: "Want cool merch?", value: '[Check out our merch store today!](https://merch.jconet.xyz "Visit the JCoNet official merchandise store today to hook yourself up with our latest branded items.")', inline: true},
        ])
        .setFooter(`Lead developer: ${stats.author}`);
        interaction.reply({ embeds: [statsembed], ephemeral: true});
    }
};