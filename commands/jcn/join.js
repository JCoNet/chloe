const config = require("../../botconfig.json");

module.exports = {
    name: "join",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete().catch(err => console.error(err));
        // if (message.authorid !== config.developer) return message.author.send("You are not allowed to use a JCoNet Developer only command.").catch(err => console.error(err));

        // bot.emit('guildMemberAdd', message.author);
        console.log(message.authorid);
        console.log(message.author.name);
        console.log(config.developer);

    },
};