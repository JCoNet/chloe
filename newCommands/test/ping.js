const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Test the latency of the bot!"),

    async execute (interaction) {
        let msg = await interaction.reply({content: "🏓 Pinging bot and api.....", ephemeral: true});
        let apiLatency = Math.round(interaction.client.ws.ping);

        let embed = new Discord.MessageEmbed()
        .setTitle("Bot ping")
        .setDescription("Latency of the server to the bot and the bot to the discord api")
        .addFields([
            {name: "Latency", value: `${apiLatency}ms`, inline: true},
        ])
        .setFooter("🏓 PONG!");

        interaction.editReply({content: "🏓 Pinging bot and api.....", embeds: [embed], ephemeral: true});
    }
}