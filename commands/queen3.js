const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.delete().catch();
	let id = bot.users.get('481872616508882944');
	let embed = new Discord.RichEmbed()
    .setTitle("Intrigued")
    .setDescription("Just need to know more")
    .setColor("#ff0000")
    .addField("Question", "Is there anything in this world you think you cannot live without, like JCoDog cannot live without you?");
  id.send(embed);
}

module.exports.help ={
  name: "queen3"
}