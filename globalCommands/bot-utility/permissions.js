const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

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
            ),
        )
        .addSubcommand(subcommand => subcommand
            .setName("role")
            .setDescription("Get permissions of a role")
            .addRoleOption(option => option
                .setName("target")
                .setDescription("The role to check")
                .setRequired(true),   
            ), 
        )
        .addSubcommand(subcommand => subcommand
            .setName("user")
            .setDescription("Get permissions of a user")
            .addUserOption(option => option
                .setName("target")
                .setDescription("The user to check")
                .setRequired(true),    
            ),
        ),

    async execute (interaction) {
        // Code to run when executed.
        var d = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
        let option = interaction.options.getSubcommand();

        if (option === "channel") {
            let target = interaction.options.getChannel("target");
            let permissions = target.permissionOverwrites;

            let permEmbed = new Discord.MessageEmbed()
            .setColor("#a7fa48")
            .setTitle("Channel Permissions Info")
            .setAuthor(target.name)
            .setDescription("The permissions we could find for this channel.")
            .addFields(
                { name: 'Permissions', value: permissions[0].permissionOverwrites },
                { name: 'NSFW', value: permissions[0].nsfw }
            )
            .setFooter(`This information is true as of: ${d}`)

            interaction.reply({embeds: [permEmbed], ephemeral: true});
        } else if (option === "user") {
            let target = interaction.options.getMember("target");
            let permissions = target.permissions.toArray().sort().join(" ");
            let roles = target.roles.cache.map(role => role.toString()).join(" ");

            let permEmbed = new Discord.MessageEmbed()
            .setColor(target.displayColor)
            .setTitle("User Permissions Info")
            .setAuthor(target.displayName, target.user.displayAvatarURL(true))
            .setDescription("The permissions we could find for this channel.")
            .addFields(
                { name: 'Permissions', value: permissions },
                { name: 'Roles', value: roles },
            )
            .setFooter(`This information is true as of: ${d}`)

            interaction.reply({embeds: [permEmbed], ephemeral: true});
        } else if (option === "role") {
            let target = interaction.options.getRole("target");
            let permissions = target.permissions.toArray().sort().join(" ");

            let permEmbed = new Discord.MessageEmbed()
            .setColor(target.color)
            .setTitle("Role Permissions Info")
            .setAuthor(target.name)
            .setDescription("The permissions we could find for this role.")
            .addFields(
                { name: 'Permissions', value: permissions },
            )
            .setFooter(`This information is true as of: ${d}`)

            interaction.reply({embeds: [permEmbed], ephemeral: true});
        } else {
            interaction.reply({content: "There was no selected operation to perform.", ephemeral: true});
        }
    }
};