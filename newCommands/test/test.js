const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test the bot!"),

    async execute (Discord, bot, connection, interaction) {
        let msg = [];
        msg.push(`Channel: ${interaction.channel.name}`);
        await interaction.reply({content: msg, ephemeral: true});
        msg.push(`\nCurrent guild: ${interaction.guild.name}`);
        await interaction.editReply({content: msg, ephemeral: true});
        msg.push(`\nBot mode: ${process.env.ENV}`);
        await interaction.editReply({content: msg, ephemeral: true});
    }
}