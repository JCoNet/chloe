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

        var yearsDiff = now.getFullYear() - joinDate.getFullYear();
        var monthsDiff = now.getMonth() - joinDate.getMonth();
        var daysDiff = now.getDate() - joinDate.getDate();
        var hoursDiff = now.getHours() - joinDate.getHours();
        var minutesDiff = now.getMinutes() - joinDate.getMinutes();
        var secondsDiff = now.getSeconds() - joinDate.getSeconds();

        console.log(now);
        console.log(joinDate);
        console.log(diff);
        console.log(yearsDiff);
        console.log(monthsDiff);
        console.log(daysDiff);
        console.log(hoursDiff);
        console.log(minutesDiff);
        console.log(secondsDiff);

    },
};