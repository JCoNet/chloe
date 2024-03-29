const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("id")
        .setDescription("View your JCN Digital ID"),

    async execute (interaction) {
        // Code to run when executed.
        let result = await interaction.client.database.query(`SELECT * FROM digitalID WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        if (result.length == 0) {
            return interaction.reply({content: "You do not have a JCN Digital ID to view, you can get one here: https://id.jconet.co.uk", ephemeral: true});
        }
        let results = result[0];

        let verified;
        let over18;

        if (results[0].userVerified == 1) {
            verified="Yes";
        } else {
            verified="No";
        };

        if (results[0].ageVerified == 1) {
            over18="Yes";
        } else {
            over18="No";
        };

        let idEmbed = new Discord.MessageEmbed()
        .setTitle(`${results[0].userName}'s Digital ID`)
        .setAuthor(`${results[0].userName}`, `${results[0].avatarURL}`, 'https://jconet.co.uk/account')
        .setThumbnail(`${results[0].avatarURL}`)
        .setDescription("The official Digital ID from your JCoNet Website linked account!")
        .addFields(
            {name: `ID Number`, value: `${results[0].idNumber}`, inline: true},
            {name: `User Name`, value: `${results[0].userName}`, inline: true},
            {name: `User ID`, value: `${results[0].userID}`, inline: true},
            {name: `Is Verified`, value: `${verified}`, inline: true},
            {name: `Is Over 18`, value: `${over18}`, inline: true},
        )
        .setFooter(`Issued: ${results[0].issueDate}`);

        interaction.reply({content: "Only you can see your JCN Digital ID. If your ID Picture does not match your Discord Profile Picture, please use the \`/update\` command!", embeds: [idEmbed], ephemeral: true});
    }
};