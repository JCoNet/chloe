module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        bot.application?.commands.create({
            name: "update",
            description: "Update your JCoNet Account link!",
        }).then(cmd => console.log(cmd));
    },
};