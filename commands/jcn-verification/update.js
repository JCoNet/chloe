module.exports = {
    name: "update",
    description: "Update your JCoNet Account link!",
    async execute(Discord, bot, connection, interaction) {
        let result = await connection.query(`SELECT * FROM digitalID WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        if (result.length == 0) {
            return interaction.reply({content: "You do not have a JCN Digital ID to update, you can get one here: https://id.jconet.co.uk", ephemeral: true});
        }
        await connection.query(`UPDATE digitalID SET avatarURL = "${interaction.user.displayAvatarURL()}" WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        return interaction.reply({content: "Your JCN Digital ID has been successfully updated.", ephemeral: true});
    },
};