const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
    await message.delete();

    if (!message.author.voiceChannel) return message.reply("Wait a second. You need to be connected to a voice channel to play music.");

    if (message.quild.me.voiceChannel) return message.reply("Sorry, but I am currently streaming amazing tunes to a voice channel already!");

    if (!args[0]) return message.reply("Sorry, but you did not request I play a URL. Please get a youtube URL then try again.");

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.reply("The URL you entrered was not valid. Please find a valid URL then try again.");

    let info = await ytdl.getInfo(args[0]);

    let connection = await message.member.voiceChannel.join();

    let dispatcher = await connection.play(ytdl(args[0], {filter: 'audioonly'}));

    message.channel.send(`Alessa is now playing: ${info.title}`);
}

module.exports.help = {
    name: "play"
}