module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        bot.application?.commands.create({
            name: "verify",
            description: "JCoNet Verification API Command!",
        }).then(cmd => console.log(cmd));
    },
};