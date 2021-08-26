module.exports = {
    name: "verify",
    description: "JCoNet Verification API Command!",
    async execute(Discord, bot, connection, interaction) {
        let result = await connection.query(`SELECT integrationRoleID FROM guildConfig WHERE guildID = '${interaction.guild.id}' AND integrationEnabled = 1`);
        let results= result[0];
        if (result.length == 0) {
            return interaction.reply({content: "This guild does not have the Verification Integratiuon purchased. Please ask the owner to do this if you feel they need it.", ephemeral: true});
        }

        console.log(result);
        console.log(results);

        // let results = result[0];
        let roleID = result[0].integrationRoleID;
        interaction.reply({content: `${roleID}`, ephemeral: true});
    },
};