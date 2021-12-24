const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("permissions")
        .setDescription("Check permissions of a user, role or channel")
        .addSubcommand(subcommand => subcommand
            .setName("channel")
            .setDescription("Get permissions of a channel.")
            .addChannelOption(option => option
                .setName("target")
                .setDescription("The channel to check")
                .setRequired(true),
            )
        )
        .addSubcmmand(subcommand => subcommand
            .setName("role")
            .setDescription("Get permissions of a role")
            .addRoleOption(option => option
                .setName("target")
                .setDescription("The role to check")
                .setRequired(true),   
            ) 
        )
        .addSubcommand(subcommand => subcommand
            .setName("user")
            .setDescription("Get permissions of a user")
            .addUserOption(option => option
                .setName("target")
                .setDescription("The user to check")
                .setRequired(true),    
            )
        ),

    async execute (interaction) {
        // Code to run when executed.
        let option = interaction.options.getSubcommand();

        if (option.getName() === "channel") {
            let target = interaction.options.getChannel("target");
            let permissions = target.permissionOverwrites;
            interaction.reply({content: `The permissions of the channel **${target.name}** are as follows:\n\`${permissions.toString()}\``})
        } else if (option.getName() === "user") {
            let target = interaction.options.getUser("target");
            let permissions = channel.permissions;
            interaction.reply({content: `The permissions of the user **${target.username}** are as follows:\n\`${permissions.toString()}\``})
        } else if (option.getName() === "role") {
            let target = interaction.options.getRole("target");
            let permissions = channel.permissions;
            interaction.reply({content: `The permissions of the role **${target.name}** are as follows:\n\`${permissions.toString()}\``})
        } else {
            interaction.reply({content: "There was no selected operation to perform.", ephemeral: true});
        }
    }
};