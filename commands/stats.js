const Discord = require("discord.js");
const stats = require("../package.json");

module.exports.run = async (bot, message, args, useprefix) => {
  message.delete().catch();
  let bicon = bot.user.displayAvatarURL;
  let statsembed = new Discord.RichEmbed()
    .setTitle("Bot Statistics")
    .setDescription(stats.description)
    .setColor("#33fede")
    .setThumbnail(bicon)
    .addField("Name", bot.user.username)
    .addField("Created on", bot.user.createdAt)
    .addField("Current version", stats.version)
    .addField("Guild count", `${bot.guilds.size}`)
    .addField("This guild prefix", useprefix)
    .addField("Save on online retail and support JCoNet!", '[Get Honey](https://www.joinhoney.com/ref/k4lomc4 "Get the Honey Extension and start saving on all your online purchases.")')
    .addField("Support JCoNet another way!", '[Donate Here](http://jconet.xyz/support "Donate to JCoNet via PayPal on the JCoNet official website.")')
    .addField("Affiliated with Streamlabs OBS", '[Get Streamlabs OBS Today](https://streamlabs.com/slobs/d/1789520 "Get Streamlabs OBS via our link to get the best streaming software and support future JCoNet streams and development.")')
    .addField("Want cool merch?", '[Check out our merch store today!](https://streamlabs.com/jconet/#/merch "Visit the JCoNet official merchandise store today to hook yourself up with our latest branded items.")')
    // .addField("Contributions", "Information on the support (financially) for this project")
    // .addField("Total contributions", "£20")
    // .addField("Top contribution", "JCoDog - £20")
    .setFooter(`Lead developer: ${stats.author}`);
  message.channel.send(statsembed);
}

module.exports.help = {
  name: "stats"
}
