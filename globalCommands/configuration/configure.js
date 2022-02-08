const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("configure")
        .setDescription("Admin and owner only command to configure the server. Can only be run once.")
        .addRoleOption(option => 
            option.setName("admin")
            .setDescription("The role for users in your server with the ADMINISTRATOR permission")
            .setRequired(true)    
        )
        .addRoleOption(option => 
            option.setName("mod")
            .setDescription("The role for users in your server with the MANAGE_MESSAGES permission")
            .setRequired(true)    
        ),

    async execute (interaction) {
        // Code to run when executed.
        let owner = await interaction.guild.fetchOwner();
        if (!interaction.user.id === owner.id && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "This command can only be executed by the guild owner or an administrator.", ephemeral: true});

        let result = await interaction.client.database.query(`SELECT * FROM guildConfig WHERE guildID = ${interaction.guild.id}`);
        let results = result[0][0];

        if (results.configured === true) return interaction.reply({content: "This command can only be executed once. Your guild is configured.", ephemeral: true});

        let admin = interaction.options.getRole("admin");
        let mod = interaction.options.getRole("mod");

        try {
            await interaction.client.database.query(`INSERT INTO guildConfig SET administratorRoleID = "${admin.id}", moderatorRoleID = "${mod.id}", configured = true WHERE guildID = ${interaction.guild.id}`);
        } catch (err) {
            if (err) return console.error(err);
        }

        interaction.reply({content: "This guild is now successfully configured.", ephemeral: true});
    }
};