const config = require("../../botconfig.json");

module.exports = {
    name: "whois",
    description: "Lookup info about you or another user!",
    async execute(Discord, bot, connection, interaction) {
        if (!interaction.user.id === config.developer) return interaction.reply({content: "This command is still being worked on and has therefore been disabled.", ephemeral: true});
        
        let user;
        let member;

        if (interaction.options.getUser("user")) {
            user = interaction.options.getUser("user");
            member = interaction.options.getMember("user");
        } else {
            user = interaction.user;
            member = interaction.member;
        };

        // .toLocaleString('en-GB', { timeZone: 'Europe/London' })
        let now = new Date();
        let joinDate = member.joinedAt;
        let diff = now - joinDate;

        console.log(now);
        console.log(joinDate);
        console.log(diff);

    },
};