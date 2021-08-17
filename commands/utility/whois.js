const config = require("../../botconfig.json");
var formatDistance = require('date-fns/formatDistance')

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
        let joined = member.joinedAt;
        let diffFormatted = formatDistance(now, joined, {includeSeconds: true})

        let whois = new Discord.MessageEmbed()
        .setAuthor(`${user.username}`, `${user.displayAvatarURL()}`)
        .setTitle("WhoIs Information")
        .setDescription("Information about yourself or the mentionned user.")
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setColor(user.displayHexColor)
        .setFooter(`User tag: ${user.tag}`);

        interaction.reply({embeds: [whois]});
    },
};