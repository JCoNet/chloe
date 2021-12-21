const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("updateguild")
        .setDescription("Update your guild info with JCoNet!"),

    async execute (interaction) {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `<@!${interaction.user.id}>, This command due to it's nature can only be run by a guild admin.`, ephemeral: true});
        };
        
    }
};