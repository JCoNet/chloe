const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("Manage user roles!")
        .addStringOption(option => 
            option.setName("operation")
            .setDescription("The operaton this command should perform.")
            .type("STRING")
            .addChoice("Add role", "add")
            .addChoice("Remove role", "remove")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("user")
            .setDescription("The user this command should target.")
            .tType("USER")
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("role")
            .setDescription("The role this command should use when running the operation.")
            .type("ROLE")
            .setRequired(true)    
        ),

    async execute (interaction) {
        let operation = interaction.options.getString('operation');
        let user = interaction.options.getMember("user");
        let role = interaction.options.getRole("role");

        // check the arguments and variables exist.
        if (!user) return interaction.reply({content: "I could not find the specified user in the server.", ephemeral: true}).catch(err => console.error(err));
        if (!role) return interaction.reply({content: "I could not find the specified role in the server.", ephemeral: true}).catch(err => console.error(err));
        
        // check roles and permissions
        if (user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: "The specified user is ranked the same or higher than you, therefore I cannot allow you to modify this user's roles.", ephemeral: true}).catch(err => console.error(err));
        if (interaction.member.roles.highest.position <= role.position) return interaction.reply({content: "The specified role is ranked the same as or higher than your highest ranked role, therefore I cannot let you assign it to anyone.", ephemeral: true}).catch(err => console.error(err));
    
        // add/remove the role
        if (operation == "add") {
            await user.roles.add(role.id).catch(err => console.error(err));
            interaction.reply({content: `You successfully added ${user.user.username} to the ${role.name} role!`, ephemeral: true}).catch(err => console.error(err));
        } else if (operation == "remove") {
            await user.roles.remove(role.id).catch(err => console.error(err));
            interaction.reply({content: `You successfully removed ${user.user.username} from the ${role.name} role!`, ephemeral: true}).catch(err => console.error(err));
        } else {
            return;
        };
    }
};