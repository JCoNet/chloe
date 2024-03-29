const config = require("../../botconfig.json");

module.exports = {
    name: "leave",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete().catch(err => console.error(err));
        if (message.author.id !== config.developer) return message.author.send("You are not allowed to use a JCoNet Developer only command.").catch(err => console.error(err));
        
        message.channel.send({content: "Goodbye, I have been instructed to leave this server."});
        message.guild.leave();
    }
}