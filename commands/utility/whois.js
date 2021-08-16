module.exports = {
    name: "whois",
    description: "Lookup info about you or another user!",
    async execute(Discord, bot, connection, interaction) {
        let user;
        let member;

        if (interaction.options.getUser("user")) {
            user = interaction.options.getUser("user");
            member = interaction.options.getMember("user");
        } else {
            user = interaction.user;
            member = interaction.member;
        };

        
    },
};