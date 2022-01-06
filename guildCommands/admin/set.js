const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Set the channels for specific messages")
        .addSubcommand(subcommand => subcommand
            .setName("welcome")
            .setDescription("Set the welcome message channel.")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("The channel to target.")
                .setRequired(true),    
            ),   
        )
        .addSubcommand(subcommand => subcommand
            .setName("announcement")
            .setDescription("Set the announcement message channel.")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("The channel to target.")
                .setRequired(true),    
            ),   
        )
        .addSubcommand(subcommand => subcommand
            .setName("system")
            .setDescription("Set the system message channel.")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("The channel to target.")
                .setRequired(true),    
            ),   
        ),

    async execute (interaction) {
        // Code to run when executed.
        let option = interaction.options.getSubcommand();
        let channel = interaction.options.getChannel("channel");

        if (option === "welcome") {
            // set welcome channel
            await connection.query(`UPDATE guildConfig SET welcomeChannelName = "${channel.name}", welcomeChannelID ="${channel.id}" WHERE guildID = "${interaction.guild.id}"`).catch(err => console.error(err));
            await interaction.reply({content: `Welcome channel set to ${channel} in ${interaction.guild.name}.`, ephemeral: true}).catch(err => console.error(err));
        } else if (option === "announcement") {
            // set announcement channel
            await connection.query(`UPDATE guildConfig SET announcementChannelName = "${channel.name}", announcementChannelID ="${channel.id}" WHERE guildID = "${interaction.guild.id}"`).catch(err => console.error(err));
            await interaction.reply({content: `Announcement channel set to ${channel} in ${interaction.guild.name}.`, ephemeral: true}).catch(err => console.error(err));
        } else if (option === "system") {
            // set system channel
            await connection.query(`UPDATE guildConfig SET systemChannelName = "${channel.name}", systemChannelID ="${channel.id}" WHERE guildID = "${interaction.guild.id}"`).catch(err => console.error(err));
            await interaction.reply({content: `System channel set to ${channel} in ${interaction.guild.name}.`, ephemeral: true}).catch(err => console.error(err));
        } else {
            interaction.reply({content: "There was no selected channel type to set", ephemeral: true});
        }
    }
};