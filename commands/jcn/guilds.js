const config = require("../../botconfig.json");
const stats = require("../../package.json");

module.exports = {
    name: "cleanup",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        const Guilds = bot.guilds.cache.map(guild => guild.name);
        message.channel.send(Guilds);
    },
};