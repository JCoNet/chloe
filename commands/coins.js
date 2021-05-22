const Discord = require('discord.js');

module.exports.run = async (bot, message, args, connection) => {
    await message.delete();

    let result = await connection.query(`SELECT coins FROM money WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`);
    let embed = new Discord.MessageEmbed()
        .setTitle("Coins")
        .setColor("#aa7ce2")
        .setDescription(`Coin Balance for ${message.author.username} on ${message.guild.name}.`)
        .setThumbnail(message.author.displayAvatarURL);
    if(!result[0]) {
        embed.addField("Total", 0, true);
        return message.channel.send(embed);
    } else {
        embed.addField("Coins", result[0].coins, true);
        return message.channel.send(embed);
    };

}

module.exports.help = {
    name: "coins"
}