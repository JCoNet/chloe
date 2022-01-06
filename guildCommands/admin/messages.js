const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("")
        .setDescription("")
        .addSubcommand(subcommand => subcommand
            .setName("status")
            .setDescription("Show the current status of the automated messages."),
        )
        .addSubcommand(subcommand => subcommand
            .setName("enable")
            .setDescription("Enable the automatic messages.")
            .addStringOption(option => option
                .setName("type")
                .setDescription("The automated message to enable.")
                .addChoice("Announcements", "a")
                .addChoice("System", "s")
                .addChoice("Welcome", "w")
                .setRequired(true)
            ),
        )
        .addSubcommand(subcommand => subcommand
            .setName("disable")
            .setDescription("Disable the automatic messages.")
            .addStringOption(option => option
                .setName("type")
                .setDescription("The automated message to disable.")
                .addChoice("Announcements", "a")
                .addChoice("System", "s")
                .addChoice("Welcome", "w")
                .setRequired(true)
            ),
        ),

    async execute (interaction) {
        // Code to run when executed.
        if (!interaction.option) {
            return;
        };
    }
};