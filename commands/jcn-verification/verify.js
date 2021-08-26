module.exports = {
    name: "verify",
    description: "JCoNet Verification API Command!",
    async execute(Discord, bot, connection, interaction) {
        let result = await connection.query(`SELECT integrationRoleID FROM guildConfig WHERE guildID = '${interaction.guild.id}' AND integrationEnabled = 1`);
        if (result[0].length == 0) {
            return interaction.reply({content: "This guild does not have the Verification Integratiuon purchased. Please ask the owner to do this if you feel they need it.", ephemeral: true});
        }

        // let results = result[0];
        let roleID = result[0][0].integrationRoleID;

        let role = interaction.guild.roles.cache.find(r => r.id === roleID);

        result = await connection.query(`SELECT userVerified, ageVerified FROM digitalID WHERE userID = '${interaction.user.id}'`);
        if (result[0].length == 0) {
            return interaction.reply({content: "You do not have a JCN ID. Please obtain one at https://id.jconet.co.uk", ephemeral: true});
        }

        let verify = false;
        
        if (result[0][0].userVerified == 1 && result[0][0].ageVerified == 1) {
            verify = true;
        }

        if (verify==true) {
            await interaction.member.roles.add(role.id).catch(err => console.error(err));
            return interaction.reply({content: `You have been verified and given the role: ${role.name}`, ephemeral: true})
        } else {
            return interaction.reply({content: "You are not eligable to be verified. You must pass age and user verification. do /id to check where you failed.", ephemeral: true});
        }
    },
};