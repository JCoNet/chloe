const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get help with the bot."),

    async execute (interaction) {
        // Code to run when executed.
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("Chloe Help")
        .setDescription("Here are the ways you can get help with Chloe be it commands not working or questions about features you are not able to access.\n\nPlease note: This bot currently works only with slash commands and there are no plans to swap to both legacy commands and slash commands. Therefore prefixes are outdated and will not work.")
        .setAuthor("JCoNet Support", "https://jconet.co.uk/resources/JCN.png", "https://support.jconet.co.uk")
        .setColor("#33fede")
        .addFields([
            {name: "Website", value: '[Our Official Support Website](https://support.jconet.co.uk "The JCoNet Official web help desk and knowledgebase.")', inline: true},
            {name: "Discord", value: '[Our Official Discord Server](https://discord.gg/jconet "The JCoNet Official discord server.")', inline: true},
            {name: "How To Use Commands", value: 'Click on the message bar and type "/" and it will then list every command Chloe has registered for your guild.', inline: true},
        ])
        .setFooter('View the bot stats with "/stats" and get help with "/help"');

        interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }
};