module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        bot.application?.commands.create({
            name: "stats",
            description: "Stats about the bot and server!",
        }).then(cmd => console.log(cmd));
    },
};