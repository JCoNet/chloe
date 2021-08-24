module.exports = {
    name: "id",
    description: "View your very own JCoNet Digital ID!",
    async execute(Discord, bot, connection, interaction) {
        let result = await connection.query(`SELECT * FROM digitalID WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
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

        interaction.reply({ embeds: [idEmbed], ephemeral: true});
    },
};