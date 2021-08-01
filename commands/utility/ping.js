module.exports = {
    name: "ping",
    description: "Test the latency of this bot!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();
        let msg = await message.channel.send("🏓 Pinging bot and api.....");
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

        message.channel.send({embeds: [embed]});
    },
};