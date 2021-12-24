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
        let result = await interaction.client.database.query("SELECT * FROM guildConfig");
        let guildConfig = result[0][0];
        msg.push(`\nDatabase guild info:\n- Name: ${guildConfig.guildName}`);
        msg.push(`\n- Owner: ${guildConfig.ownerName}`);
        await interaction.editReply({content: msg.toString(), ephemeral: true});

    }
}