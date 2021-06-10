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
  let defaultChannel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
  let sysChannel = guild.sysChannel;
  let sysChannelName;
  let sysChannelID;
  if (!sysChannel) {
    sysChannelName = defaultChannel.name;
    sysChannelID = defaultChannel.id;
  } else {
    sysChannelName = guild.sysChannel.name;
    sysChannelID = guild.sysChannel.id;
  };

  let guildOwner = await guild.members.fetch(guild.ownerID);

  let result = await connection.query(`SELECT * FROM guildConfig WHERE guildID="${guild.id}"`);
  let results = result[0];

  if (results.length == 0) {
    await connection.query(`INSERT INTO guildConfig SET guildName = "${guild.name}", guildID = "${guild.id}", prefix = "${botConf[0].defaultPrefix}", ownerName = "${guildOwner.user.username}", ownerID = "${guildOwner.user.id}", systemChannelName = "${sysChannelName}", systemChannelID = "${sysChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  };

  await guild.systemChannel.send("Thank you for adding me to your server do chloe/help to find out all the commands I offer!").catch(err => console.log(err));

  let newGuildEmbed = new Discord.MessageEmbed()
    .setColor('#24d3f2')
    .setTitle("Chloe Beta Requirements")
    .setDescription("Using Chloe Beta means you are required to follow our requirements including regular feedback about the bot useage and reporting any bugs.")
    .setURL("https://chloe.jconet.xyz/")
    .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
    .setThumbnail(bot.user.displayAvatarURL()
    .addField("Requirements", "The introduction of Chloe Beta opens up many issues such as possibilities of crashes and commands not working. the requirements on you are that you do not spam commands and report any commands not working or not showing the results properly to our proper communication options below. You are also required to give us feedback and thoughts on how the bot is working in your server and how it operates. Other suggestions to changing the command layouts etc are welcomed.")
    .addField("Email us", 'chloe-beta@jconet.xyz', true)
    .addField("Talk to our team", '[JCoNet Live Support](https://tawk.to/jcnsupport "JCoNet Support Live Chat Link")', true)
    .addField("Submit a ticket", '[JCoNet Knowledge Base](https://jconet.tawk.help "JCoNet Knowledge Base Link (tickets submitted through here)")', true)
    .setFooter('Quickly Re-Add Chloe Beta if we told you to remove and re-add her. [Invite link for Chloe Beta](https://discord.com/oauth2/authorize?client_id=845392640920518666&permissions=8&scope=bot "Invite for chloe beta")');

  await guild.systemChannel.send(newGuildEmbed);

});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("JCoNet Development is restricting the number of variables that might cause me issues, meaning I am prohibited from running commands in DM. Sorry for the inconvenience.");
  
  // find and set prefix
  let useprefix;
  let updated;

  let result = await connection.query(`SELECT prefix FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.log(err));
  let results = result[0];
  if (results.length == 0) {
    useprefix = botConf[0].defaultPrefix;
    updated = "no";
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
    if (updated == "no") {
      let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Important Notice")
        .setColor("#ff0000")
        .setDescription("It seems this guild has not been updated to utilise my new features, please get an admin to run the following command to enable these features!")
        .addField("Command", `${useprefix}updateguild`)
        .setFooter(`Any questions please contact: customer_support@jconet.xyz or visit our website and use our live chat https://jconet.xyz`);
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
