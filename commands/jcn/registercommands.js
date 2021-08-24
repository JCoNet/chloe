module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        bot.application?.commands.create({
            name: "verify",
            description: "Ask Chloe to verify your identity and age in a JCN Verification enabled server to get the verified role!",
        }).then(cmd => console.log(cmd));
    },
};