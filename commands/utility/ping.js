module.exports = {
    name: "ping",
    description: "Test the latency of this bot!",
    args: false,
    async execute(Discord, bot, connection, interaction) {
        await message.delete();
        let msg = await interaction.reply({content: "🏓 Pinging bot and api.....", ephemeral: true});
        let latency = Math.floor(msg.createdTimestamp - message.createdTimestamp);
        let apiLatency = Math.round(bot.ws.ping);

        let embed = new Discord.MessageEmbed()
        .setTitle("Bot ping")
        .setDescription("Latency of the server to the bot and the bot to the discord api")
        .addFields([
            {name: "Bot Latency", value: `${latency}ms`, inline: true},
            {name: "API Latency", value: `${apiLatency}ms`, inline: true},
        ])
        .setFooter("🏓 PONG!");

        interaction.reply({embeds: [embed], ephemeral: true});
    },
};