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

        // .toLocaleString('en-GB', { timeZone: 'Europe/London' })
        let now = new Date();
        let joinDate = member.joinedAt;
        let diff = now - joinDate;

        var seconds = Math.floor(diff / 1000),
            minutes = Math.floor(seconds / 60),
            hours   = Math.floor(minutes / 60),
            days    = Math.floor(hours / 24),
            months  = Math.floor(days / 30),
            years   = Math.floor(days / 365);

        console.log(now);
        console.log(joinDate);
        console.log(diff);
        console.log(years);
        console.log(months);
        console.log(days);
        console.log(hours);
        console.log(minutes);
        console.log(seconds);

    },
};