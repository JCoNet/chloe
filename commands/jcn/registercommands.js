module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        bot.application.commands.create({
            name: 'ping',
            description: 'Get the ping of the bot.',
        })
        .catch(console.error);
    },
};