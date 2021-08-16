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

        let now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
        let joinDate = new Date(user.joinedAt()).toLocaleString('en-GB', { timeZone: 'Europe/London' });
        let diff = now - joinDate;

        console.log(now);
        console.log(joinDate);
        console.log(diff);

    },
};