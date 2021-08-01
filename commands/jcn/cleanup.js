const config = require("../../botconfig.json");
const stats = require("../../package.json");

module.exports = {
    name: "cleanup",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete().catch(err => console.error(err));
        if (message.author.id !== config.developer) return message.author.send("You are not allowed to use a JCoNet Developer only command.").catch(err => console.error(err));

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