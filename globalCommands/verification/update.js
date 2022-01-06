const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("Update your JCN Digital ID"),

    async execute (interaction) {
        let result = await interaction.client.database.query(`SELECT * FROM digitalID WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        if (result.length == 0) {
            return interaction.reply({content: "You do not have a JCN Digital ID to update, you can get one here: https://id.jconet.co.uk", ephemeral: true});
        }
        await interaction.client.database.query(`UPDATE digitalID SET avatarURL = "${interaction.user.displayAvatarURL()}" WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        return interaction.reply({content: "Your JCN Digital ID has been successfully updated.", ephemeral: true});
    }
};