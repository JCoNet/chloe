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

        var yearsDiff = today.getFullYear() - joinDate.getFullYear();
        var monthsDiff = today.getMonth() - joinDate.getMonth();
        var daysDiff = today.getDate() - joinDate.getDate();
        var hoursDiff = today.getHours() - joinDate.getHours();
        var minutesDiff = today.getMinutes() - joinDate.getMinutes();
        var secondsDiff = today.getSeconds() - joinDate.getSeconds();

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