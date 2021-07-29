const config = require("../../botconfig.json");
const stats = require("../../package.json");

module.exports = {
    name: "guilds",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        const Guilds = await bot.guilds.cache.map(guild => guild.name);
        console.log(Guilds);
        message.channel.send( JSON.stringify(Guilds))
    },
};