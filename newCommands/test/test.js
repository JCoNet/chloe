const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test the bot!")
        .setAliases(["testing"]),

    async execute (Discord, bot, connection, interaction) {
        const streamChannel = bot.channels.cache.get('818685046302965801');
        let msg = await interaction.reply({content: `Channel: ${JSON.stringify(streamChannel)}`, ephemeral: true});
        msg = await interaction.editReply({content: msg + `\nCurrent guild: ${interaction.guild.name}`, ephemeral: true});
        msg = await interaction.editReply({content: msg + `\nBot mode: ${process.env.ENV}`, ephemeral: true});
    }
}