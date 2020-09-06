const Discord = require("discord.js");

module.exports.run = async (bot, message, args, useprefix) => {

    await message.delete();

    let moodEmbed = new Discord.RichEmbed()
        .setTitle("Chloe Support")
        .setColor("#f03090")
        .setDescription("Here is a playlist to help you lift your mood. If you need to chat, message JCoDog.")
        .addField("Link to playlist", '[Click here to open the playlist on spotify!](https://open.spotify.com/playlist/7y6R3Nr4ZYqVeFIPHjmP9i?si=g267nR7wRG2iCR6PS99m1g"A playlist that helped JCoDog when he was down, hopefully it will help you too.")');
    message.channel.send(moodEmbed).catch(err => console.log(err));

};

module.exports.help = {
    name: "mood"
};