const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test the bot!"),

    async execute (Discord, bot, connection, interaction) {
        let msg = await interaction.reply({content: `Channel: ${interaction.channel.name}`, ephemeral: true});
        interaction.channel.send({content: `\`${msg.content}\``})
        msg = await interaction.editReply({content: msg + `\nCurrent guild: ${interaction.guild.name}`, ephemeral: true});
        msg = await interaction.editReply({content: msg + `\nBot mode: ${process.env.ENV}`, ephemeral: true});
    }
}