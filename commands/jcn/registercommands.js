module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        let newCommand = await bot.application?.commands.create({
            name: 'ping',
            description: 'Test the latency of this bot!'
        });
        console.log(newCommand);
        message.reply(`Command created. ${newCommand.name} - ${newCommand.description}. Use it by doing /${newCommand.name}`).then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));      
    },
};