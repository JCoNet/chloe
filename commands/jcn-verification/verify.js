module.exports = {
    name: "verify",
    description: "JCoNet Verification API Command!",
    async execute(Discord, bot, connection, interaction) {
        interaction.reply({content: "Verification command is coming soon.", ephemeral: true});
    },
};