const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.delete().catch();
	let id = bot.users.get('481872616508882944');
	let embed = new Discord.RichEmbed()
    .setTitle("Intrigued")
    .setDescription("Just need to know more")
    .setColor("#ff0000")
    .addField("Link to song", "['Here']('https://www.youtube.com/watch?v=4fndeDfaWCg')")
    .addField("Question", "Are you aware you are the most beautiful girl on Avalon and possibly all of discord?");
  id.send(embed);
}

module.exports.help ={
  name: "queen2"
}