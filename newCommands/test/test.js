const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test the bot!"),

    async execute (interaction) {
        let msg = [];
        msg.push(`Channel: ${interaction.channel.name}`);
        await interaction.reply({content: msg.toString(), ephemeral: true});
        msg.push(`\nCurrent guild: ${interaction.guild.name}`);
        await interaction.editReply({content: msg.toString(), ephemeral: true});
        msg.push(`\nBot mode: ${process.env.ENV}`);
        await interaction.editReply({content: msg.toString(), ephemeral: true});
        msg.push(`\nDatabase guild info:`);
        let result = await connection.query("SELECT * FROM guildConfig");
        let guildConfig = result[0][0];
        msg.push(`\nName: ${guildConfig.guildName} Owner: ${guildConfig.ownerName}`);
        await interaction.editReply({content: msg.toString(), ephemeral: true});

    }
}