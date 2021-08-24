module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        bot.application?.commands.create({
            name: "id",
            description: "View your very own JCoNet Digital ID!",
        }).then(cmd => console.log(cmd));
    },
};