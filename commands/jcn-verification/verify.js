module.exports = {
    name: "verify",
    description: "Ask Chloe to verify your identity and age in a JCN Verification enabled server to get the verified role!",
    async execute(Discord, bot, connection, interaction) {
        interaction.reply({content: "Verification command is coming soon.", ephemeral: true});
    },
};