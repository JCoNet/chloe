const Discord = require("discord.js");
const mysql = require("mysql2/promise");
const fs = require("fs");
const stats = require("./package.json");
const config = require("./botconfig.json");

const bot = new Discord.Client();

require("discord-buttons")(bot);
const { MessageButton, MessageActionRow } = require("discord-buttons");

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

bot.once('ready', async () => {
  //set up botConf
  var d = new Date();
  let result = await connection.query("SELECT statusMessage, statusType, defaultPrefix FROM defaultConfig");
  botConf = result[0];
  // set up the bot status items when it conencts to api
  console.log(`Chloe sucessfully activated on ${d}, now ready for service. Operating on version ${stats.version} and framework ${stats.frmwrk}.`);
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

  let result = await connection.query(`SELECT * FROM guildConfig WHERE guildID="${guild.id}"`).catch(err => console.log(err));
  let results = result[0];

  if (results.length == 0) {
    await connection.query(`INSERT INTO guildConfig SET guildName = "${guild.name}", guildID = "${guild.id}", prefix = "${botConf[0].defaultPrefix}", ownerName = "${guildOwner.user.username}", ownerID = "${guildOwner.user.id}", systemChannelName = "${sysChannelName}", systemChannelID = "${sysChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.log(err));
  };

  await defaultChannel.send("Thank you for adding me to your server do chloe/help to find out all the commands I offer!").catch(err => console.log(err));

  let newGuildEmbed = new Discord.MessageEmbed()
    .setColor('#24d3f2')
    .setTitle("Chloe Beta Requirements")
    .setDescription("Using Chloe Beta means you are required to follow our requirements including regular feedback about the bot useage and reporting any bugs.")
    .setURL("https://chloe.jconet.xyz/")
    .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
    .setThumbnail(bot.user.displayAvatarURL())
    .addField("Requirements", "The introduction of Chloe Beta opens up many issues such as possibilities of crashes and commands not working. the requirements on you are that you do not spam commands and report any commands not working or not showing the results properly to our proper communication options below. You are also required to give us feedback and thoughts on how the bot is working in your server and how it operates. Other suggestions to changing the command layouts etc are welcomed.")
    .addField("Email us", 'chloe-beta@jconet.xyz')
    .addField("Talk to our team", '[JCoNet Live Support](https://tawk.to/jcnsupport "JCoNet Support Live Chat Link")')
    .addField("Submit a ticket", '[JCoNet Knowledge Base](https://jconet.tawk.help "JCoNet Knowledge Base Link (tickets submitted through here)")')
    .addField('Quickly Re-Add Chloe Beta if we told you to remove and re-add her.', '[Invite link for Chloe Beta](https://discord.com/oauth2/authorize?client_id=845392640920518666&permissions=8&scope=bot "Invite for chloe beta")')
    .setFooter(`Lead developer: ${stats.author}`);

  await guild.systemChannel.send(newGuildEmbed);

});

bot.on('guildMemberAdd', async member => {
  var d = new Date();
  // member.guild.channels.get('channelID').send("Welcome"); 
  let result = await connection.query(`SELECT welcomeChannelID, welcomeMessage, welcomeEnabled FROM guildConfig WHERE guildID="${member.guild.id}"`).catch(err => console.log(err));
  let results = result[0];
  
  let welcomeEnabled = await results[0].welcomeEnabled;
  let welcomeMessage = await results[0].welcomeMessage;
  let welcomeChannel = await member.guild.channels.cache.get(results[0].welcomeChannelID);
  let check = member.guild.iconURL();
  let serverIcon;
  if (!check) {
    serverIcon = "https://jconet.xyz/resources/JCN.png";
  } else {
    serverIcon = check;
  };
  // console.log(`enabled: ${welcomeEnabled}`);
  // console.log(`message: ${welcomeMessage}`);
  // console.log(`channel: ${welcomeChannel}`);
  if (welcomeEnabled == 1){
    // welcome embed
    let welcomeEmbed = new Discord.MessageEmbed()
    .setColor("#3efa67")
    .setTitle("New User Joined")
    .setDescription(`${welcomeMessage}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor(`${member.guild.name}`, `${serverIcon}`)
    .addFields(
      {name: "name", value: `${member.user.username}`, inline: true},
      {name: "Join date", value: `${d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()}`, inline: true},
      {name: "Join time", value: `${d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()}`, inline: true},
      {name: "mention", value: `<@${member.user.id}>`},
    )
    .setFooter(`The owner of this server is ${member.guild.owner.user.username}`);

    welcomeChannel.send(welcomeEmbed);

  } else {
    return;
  };

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

bot.on('clickButton', async (button) => {
  // admin buttons
  // generic cancel fucntion for all admin button aided embeds.
  if (button.id == "admincancel") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      button.channel.send(`Cancelled channel setup for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  };
  
  // channel setup buttons
  if (button.id == "welcome") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      // set welcome channel
      await connection.query(`UPDATE guildConfig SET welcomeChannelName = "${button.channel.name}", welcomeChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.log(err));
      button.channel.send(`Welcome channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "system") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      // set system channel
      await connection.query(`UPDATE guildConfig SET systemChannelName = "${button.channel.name}", systemChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.log(err));
      button.channel.send(`System channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "announcement") {
     button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      // set announcement channel
      await connection.query(`UPDATE guildConfig SET announcementChannelName = "${button.channel.name}", announcementChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.log(err));
      button.channel.send(`Announcement channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.log(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  };
});