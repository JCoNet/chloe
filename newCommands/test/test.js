const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test the bot!"),

    async execute (Discord, bot, connection, interaction) {
        let msg = await interaction.reply({content: `Channel: ${interaction.channel.name}`});
        interaction.channel.send({content: `\`${msg}\``})
        msg = await interaction.editReply({content: msg + `\nCurrent guild: ${interaction.guild.name}`});
        msg = await interaction.editReply({content: msg + `\nBot mode: ${process.env.ENV}`});
    }
}