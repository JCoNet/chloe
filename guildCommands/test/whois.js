const config = require("../../botconfig.json");
var formatDistance = require('date-fns/formatDistance');


const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Find out information about yourself or a selected user")
        .addUserOption(option =>
            option.setName("user")
            .setDescription("The user to target")
            .setType("USER")
        ),

    async execute (interaction) {
        // Code to run when executed.
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
        .setColor(member.displayHexColor)
        .addFields(
            {},
            {},
        )
        .setFooter(`User tag: ${user.tag} ~~~~ Time in server: ${diffFormatted}`);

        interaction.reply({embeds: [whois], ephemeral: true});
    }
};