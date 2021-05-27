const Discord = require("discord.js");
const mysql = require("mysql2/promise");
const fs = require("fs");
const bot = new Discord.Client();
const connection = mysql.createPool({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName,
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0
});
console.log("Connected to secure DB!");
const config = require("./botconfig.json");

var d = new Date();

console.log(`${config.test}`);

bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, file) => {
  if (err) console.log(err);
  let jsfile = file.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("No commands");
    return;
  };
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} configured correctly and loaded into the bot`);
    bot.commands.set(props.help.name, props)
  });
});

let botConf;

// connect to correct bot with login token
// bot.login(process.env.token);
bot.login(process.env.betatoken);

bot.on('ready', async () => {
  //set up botConf
  let result = await connection.query("SELECT statusMessage, statusType, defaultPrefix FROM defaultConfig");
  botConf = result[0];
  // set up the bot status items when it conencts to api
  console.log(`Chloe sucessfully activated on ${d}, now ready for service.`);
  bot.user.setActivity(`${botConf[0].statusMessage}`, {type: `${botConf[0].statusType}`});
});

bot.on('guildCreate', async guild => {
  let defaultChannel = await guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
  await connection.query(`INSERT INTO guildConfig SET guildName = "${guild.name}", guildID = "${guild.id}", prefix = "${botConf[0].defaultPrefix}", ownerName = "${guild.owner.username}", ownerID = "${guild.ownerID}", systemChannelName = "${guild.systemChannel}", systemChannelID = "${guild.systemChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  await guild.systemChannel.send("Thank you for adding me to your server do chloe/help to find out all the commands I offer!").catch(err => console.log(err));
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("JCoNet Development is restricting the number of variables that might cause me issues, meaning I am prohibited from running commands in DM. Sorry for the inconvenience.");
  
  // find and set prefix
  let useprefix;
  let updated = "no";

  let result = await connection.query(`SELECT prefix FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.log(err));
  let results = result[0];
  if (results.length == 0) {
    useprefix = botConf[0].defaultPrefix;
  } else {
    useprefix = results[0].prefix;
    updated = "yes";
  };
  
  // define params for command/message
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  // check if is a command or not
  if (message.content.startsWith(useprefix)) {
    // is command, execute command
    let commandfile = bot.commands.get(cmd.slice(useprefix.length));
    if (commandfile) commandfile.run(bot, message, args, connection, useprefix);
  } else {
    // isn't command, affect balance by message
    if (updated == "yes") {
      return;
    } else {
      let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Important Notice")
        .setColor("#ff0000")
        .setDescription("It seems this guild has not been updated to utilise my new features, please get an admin to run the following command to enable these features!")
        .addField("Command", `${useprefix}updateguild`);
      message.channel.send(errorEmbed).catch(err => console.log(err));
    }
    let coinstoadd = 1;
    let newBal;

    let result = await connection.query(`SELECT coins FROM money WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.log(err));
    let results = result[0];
    if (results.length == 0) {
      await connection.query(`INSERT INTO money SET guildID = "${message.guild.id}", guildName = "${message.guild.name}", userID = "${message.author.id}", userName = "${message.author.username}", coins = ${coinstoadd}`).catch(err => console.log(err));
    } else {
      newBal = results[0].coins + coinstoadd;
      await connection.query(`UPDATE money SET coins = ${newBal} WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.log(err));
    };
  };

});
