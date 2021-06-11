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
    .addFields(
      {name: "Name", value: bot.user.username, inline: true},
      {name: "Created on", value: bot.user.createdAt, inline: true},
      {name: "Current version", value: stats.version, inline: true},
      {name: "Running On", value: `JCoNet BotFramework Version: ${stats.frmwrk}`, inline: true},
      {name: '\u200B', value: '\u200B', inline: false},
      {name: "Guild count", value: bot.guilds.cache.size, inline: true},
      {name: "This guild prefix", value: useprefix, inline: true},
      {name: '\u200B', value: '\u200B', inline: false},
      {name: "Support Chloe and JCoNet", value: '\u200B', inline: false},
      {name: "Save on online retail and support JCoNet!", value: '[Get Honey](https://www.joinhoney.com/ref/k4lomc4 "Get the Honey Extension and start saving on all your online purchases.")', inline: true},
      {name: "Support JCoNet another way!", value: '[Donate Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=78GGH2NZ57WUJ&source=url "Donate to JCoNet via PayPal on the JCoNet official website.")', inline: true},
      {name: "Affiliated with Streamlabs OBS", value: '[Get Streamlabs OBS Today](https://streamlabs.com/slobs/d/1789520 "Get Streamlabs OBS via our link to get the best streaming software and support future JCoNet streams and development.")', inline: true},
      {name: "Want cool merch?", value: '[Check out our merch store today!](https://merch.jconet.xyz "Visit the JCoNet official merchandise store today to hook yourself up with our latest branded items.")', inline: true},
    )
    .setFooter(`Lead developer: ${stats.author}`);
  message.channel.send(statsembed);
}

module.exports.help = {
  name: "stats"
}
