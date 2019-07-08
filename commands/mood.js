const Discord = require("discord.js");

module.exports.run = async (bot, message, args, useprefix) => {

    await message.delete();

    let moodEmbed = new Discord.RichEmbed()
        .setTitle("Chloe Support")
        .setColor("#f03090")
        .setDescription("Here is a song to help you lift your mood. If you need to chat, message JCoDog.")
        .addField("Link to song", '[Click here to open the song on spotify!](https://open.spotify.com/album/5AEgsSGBHblhs5ZRFOLI4n?si=skWigbeiRd6Ud1HKG0uJJA "A song that helped JCoDog when he was down, hopefully it will help you too.")');
    message.reply(moodEmbed).catch(err => console.log(err));

};

module.exports.help = {
    name: "mood"
};