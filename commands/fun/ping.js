module.exports = {
    name: "ping",
    description: "Test the latency of this bot!",
    args: false,
    async execute(Discord, bot, connection, interaction) {
        let msg = await interaction.reply({content: "🏓 Pinging bot and api.....", ephemeral: true});
        let apiLatency = Math.round(bot.ws.ping);

        let embed = new Discord.MessageEmbed()
        .setTitle("Bot ping")
        .setDescription("Latency of the server to the bot and the bot to the discord api")
        .addFields([
            {name: "Latency", value: `${apiLatency}ms`, inline: true},
        ])
        .setFooter("🏓 PONG!");

        interaction.editReply({content: "🏓 Pinging bot and api.....", embeds: [embed], ephemeral: true});
    },
};