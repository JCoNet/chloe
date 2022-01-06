const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coins")
        .setDescription("Check your coin balance within the guild."),

    async execute (interaction) {
        // Code to run when executed.

        let result = await interaction.client.database.query(`SELECT coins FROM money WHERE guildID = "${interaction.guild.id}" AND userID = "${interaction.user.id}"`);
        let results = result[0];
        let embed = new Discord.MessageEmbed()
            .setTitle("Coins")
            .setColor("#aa7ce2")
            .setDescription(`Coin Balance for ${interaction.member.displayName} on ${interaction.guild.name}.`)
            .setThumbnail(interaction.user.displayAvatarURL(true));
        if(results.length == 0) {
            embed.addField("Total", `0`, true);
            return interaction.reply({embeds: [embed], ephemeral: true});
        } else {
            embed.addField("Coins", `${results[0].coins}`, true);
            return interaction.reply({embeds: [embed], ephemeral: true});
        };
    }
};