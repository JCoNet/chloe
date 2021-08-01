module.exports = {
    name: "yeet",
    description: "Throw a user!",
    args: true,
    usage: "<user>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();
        let cost = 25;
        let result = await connection.query(`SELECT coins FROM money WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.error(err));
        let results = result[0];
        if (results.length == 0) {
            return message.reply(`You currently have no coins to use. This command costs ${cost} coins!`);
        };

        if (results[0].coins < cost) {
            return message.reply(`You do not have enough coins to use this command. This command costs ${cost} coins!`);
        };

        let newbal = results[0].coins - cost;
        await connection.query(`UPDATE money SET coins="${newbal}" WHERE guildID="${message.guild.id}" AND userID="${message.author.id}"`).catch(err => console.error(err));

        let yeetee = message.guild.members.cache.get(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        let distance = Math.floor(Math.random() * 1000) +10;

        let msg = message.reply(`you are now yeeting <@!${yeetee.id}>! 🛫.....`);
        let embed = new Discord.MessageEmbed()
        .setTitle("Ya Yeet!")
        .setDescription("Enjoy the trip!")
        .setColor("#980098")
        .addFields([
            {name: "Thrower", value: `${message.author.username}`, inline: true},
            {name: "Recipient", value: `${yeetee.user.username}`, inline: true},
            {name: "Distance", value: `${distance}ft`, inline: true},
        ])
        .setFooter(`This command cost ${message.author.username} ${cost} coins to use...`);

        message.channel.send({embeds: [embed]}).catch(err => console.error(err));
    },
};