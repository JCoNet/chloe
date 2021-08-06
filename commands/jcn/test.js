module.exports = {
    name: "test",
    description: "Manage threads",
    async execute(Discord, bot, connection, message, args, useprefix) {
        const streamChannel = bot.channels.cache.get('818685046302965801');
        message.reply(`Channel: ${JSON.stringify(streamChannel)}`);
    },
};