module.exports = {
    name: "verify",
    description: "JCoNet Verification API Command!",
    async execute(Discord, bot, connection, interaction) {
        interaction.reply({content: "Verification command is coming soon.", ephemeral: true});
        let result = connection.query(`SELECT integrationRoleID FROM guildConfig WHERE guildID = ${interaction.reply} AND integrationEnabled = 1`);
        if (result.length === 0) {
            return interaction.reply({content: "This guild does not have the Verification Integratiuon purchased. Please ask the owner to do this if you feel they need it.", ephemeral: true});
        }

        let roleID = result[0][0]["integrationRoleID"];

        integration.reply(`${roleID}`);
    },
};