const Discord = require("discord.js");
const stats = require("../package.json");

module.exports.run = async (bot, message, args, connection, useprefix) => {
  message.delete().catch();
  let bicon = bot.user.displayAvatarURL();
  let statsembed = new Discord.MessageEmbed()
    .setTitle("Bot Statistics")
    .setDescription(stats.description)
    .setColor("#33fede")
    .setThumbnail(bicon)
    .addField("Name", bot.user.username, true)
    .addField("Created on", bot.user.createdAt, true)
    .addField("Current version", stats.version, true)
    .addField("Running On", `JCoNet BotFramework Version: ${stats.frmwrk}`, true)
    .addField("Guild count", bot.guilds.cache.size, true)
    .addField("This guild prefix", useprefix, true)
    .addField("Save on online retail and support JCoNet!", '[Get Honey](https://www.joinhoney.com/ref/k4lomc4 "Get the Honey Extension and start saving on all your online purchases.")', true)
    .addField("Support JCoNet another way!", '[Donate Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=78GGH2NZ57WUJ&source=url "Donate to JCoNet via PayPal on the JCoNet official website.")', true)
    .addField("Affiliated with Streamlabs OBS", '[Get Streamlabs OBS Today](https://streamlabs.com/slobs/d/1789520 "Get Streamlabs OBS via our link to get the best streaming software and support future JCoNet streams and development.")', true)
    .addField("Want cool merch?", '[Check out our merch store today!](https://teespring.com/stores/jconet "Visit the JCoNet official merchandise store today to hook yourself up with our latest branded items.")', true)
    // .addField("Contributions", "Information on the support (financially) for this project")
    // .addField("Total contributions", "£20")
    // .addField("Top contribution", "JCoDog - £20")
    .setFooter(`Lead developer: ${stats.author}`);
  message.channel.send(statsembed);
}

module.exports.help = {
  name: "stats"
}
