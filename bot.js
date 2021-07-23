require('dotenv').config('.env');

const Discord = require("discord.js");
const mysql = require("mysql2/promise");
const fs = require("fs");
const stats = require("./package.json");
const config = require("./botconfig.json");
const ascii = require("ascii-table");

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
if (connection) {
  console.log("Connected to secure DB!");
};

console.log(`${config.test}`);

table = new ascii().setHeading("Command File", "Load Status");

bot.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
        // console.log(`Attempting to load command ${command.name}`);
		if (command.name) {
            bot.commands.set(command.name, command);
            table.addRow(file.split('.').slice(0, -1).join('.'), '✔');
            continue;
        } else {
            table.addRow(file.split('.').slice(0, -1).join('.'), '❌ => This command is missing something and cannot load.');
            continue;
        }
	}
}

console.log(table.toString());

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
  // bot.user.setActivity(`${botConf[0].statusMessage}`, {type: `${botConf[0].statusType}`});
  // bot.user.setStatus("dnd");
  bot.user.setPresence({
    status: "dnd",  // You can show online, idle... Do not disturb is dnd
    activity: {
        name: `${botConf[0].statusMessage}`,  // The message shown
        type: `${botConf[0].statusType}` // PLAYING, WATCHING, LISTENING, STREAMING,
    }
  });
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

  let result = await connection.query(`SELECT * FROM guildConfig WHERE guildID="${guild.id}"`).catch(err => console.error(err));
  let results = result[0];

  if (results.length == 0) {
    await connection.query(`INSERT INTO guildConfig SET guildName = "${guild.name}", guildID = "${guild.id}", prefix = "${botConf[0].defaultPrefix}", ownerName = "${guildOwner.user.username}", ownerID = "${guildOwner.user.id}", systemChannelName = "${sysChannelName}", systemChannelID = "${sysChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.error(err));
  };

  await defaultChannel.send("Thank you for adding me to your server do chloe/help to find out all the commands I offer!").catch(err => console.error(err));

  let newGuildEmbed = new Discord.MessageEmbed()
    .setColor('#24d3f2')
    .setTitle("Chloe Beta Requirements")
    .setDescription("Using Chloe Beta means you are required to follow our requirements including regular feedback about the bot useage and reporting any bugs.")
    .setURL("https://chloe.jconet.co.uk/")
    .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk')
    .setThumbnail(bot.user.displayAvatarURL())
    .addField("Requirements", "The introduction of Chloe Beta opens up many issues such as possibilities of crashes and commands not working. the requirements on you are that you do not spam commands and report any commands not working or not showing the results properly to our proper communication options below. You are also required to give us feedback and thoughts on how the bot is working in your server and how it operates. Other suggestions to changing the command layouts etc are welcomed.")
    .addField("Email us", 'chloe_beta@jconet.co.uk')
    .addField("Talk to our team", '[JCoNet Live Support](https://tawk.to/jcnsupport "JCoNet Support Live Chat Link")')
    .addField("Submit a ticket", '[JCoNet Knowledge Base](https://jconet.tawk.help "JCoNet Knowledge Base Link (tickets submitted through here)")')
    .addField('Quickly Re-Add Chloe Beta if we told you to remove and re-add her.', '[Invite link for Chloe Beta](https://discord.com/oauth2/authorize?client_id=845392640920518666&permissions=8&scope=bot "Invite for chloe beta")')
    .setFooter(`Lead developer: ${stats.author}`);

  await guild.systemChannel.send(newGuildEmbed);

});

bot.on('guildDelete', async guild => {
  connection.query(`DELETE FROM guildConfig WHERE guildID = '${guild.id}'`).catch(err => console.error(err));
  connection.query(`DELETE FROM money WHERE guildID = '${guild.id}'`).catch(err => console.error(err));
});

bot.on('guildMemberAdd', async member => {
  var d = new Date();
  // member.guild.channels.get('channelID').send("Welcome"); 
  let result = await connection.query(`SELECT welcomeChannelID, welcomeMessage, welcomeEnabled FROM guildConfig WHERE guildID="${member.guild.id}"`).catch(err => console.error(err));
  let results = result[0];
  
  let welcomeEnabled = await results[0].welcomeEnabled;
  let welcomeMessage = await results[0].welcomeMessage;
  let welcomeChannel = await member.guild.channels.cache.get(results[0].welcomeChannelID);
  let check = member.guild.iconURL();
  let serverIcon;
  if (!check) {
    serverIcon = "https://jconet.co.uk/resources/JCN.png";
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
      {name: "mention", value: `<@!${member.user.id}>`},
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

  let result = await connection.query(`SELECT prefix FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.error(err));
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
  let commandName = messageArray[0].slice(useprefix.length).toLowerCase();
  let args = messageArray.slice(1);

  // blacklist words auto ban
  let blresult = await connection.query("SELECT word FROM blacklistWords").catch(err => console.error(err));
  let blresults = blresult[0];
  let blacklist = [];
  var len = blresults.length;
  for (var i = 0; i < len; i++) {
    blacklist.push(blresults[i].word);
  };
  
  for (let x = 0; x < blacklist.length; x++) {
    if (message.content.toLowerCase().includes(blacklist[x].toLowerCase())) {
      let detected = blacklist[x].toLowerCase();
      // word found
      if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
        let owner = message.guild.owner;
        let staffBL = new Discord.MessageEmbed()
        .setTitle("Your action is required")
        .setDescription("I have detected one of your staff members saying a blacklisted word and have deleted the message. Please ban or kick at your discretion. I am programmed to ban anyone that says these words who is not staff (I cannot ban staff)")
        .addFields(
          {name: "Server", value: `${message.guild.name}`, inline: true},
          {name: "Staff Member", value: `${message.author.username}`, inline: true},
          {name: "Detected Word", value: `${detected}`, inline: true},
        )
        .setFooter("This is automated for the safety of your server by JCoNet Development.");

        await message.delete().catch(err => console.error(err));
        owner.send(staffBL);
        return;
      };
      
      let blEmbed = new Discord.MessageEmbed()
      .setTitle("Automated Ban")
      .setDescription("A user has said a blacklisted word and been automatically banned. This deleted their last 7 days of messages.")
      .addFields(
        {name: "User", value: `${message.author.username}`, inline: true},
        {name: "User ID", value: `${message.author.id}`, inline: true},
      )
      .setFooter("This is an automated action to protect the server on the behalf of JCoNet Development.");

      let reason = "You said a word on the blacklist. That offence is an automated ban.";
      await message.author.send(`You have been banned from ${message.guild.name} for ${reason}`).catch(err => console.error(err));
      let banned = message.guild.members.cache.get(message.author.id);
      await banned.ban({days: 7, reason: reason}).then(message.channel.send(blEmbed)).catch(err => console.error(err));
      await connection.query(`INSERT INTO incidents SET serverID = "${message.guild.id}", serverName = "${message.guild.name}", userID = "${message.author.id}", userName = "${message.author.username}", type = "  AUTOMATED BAN", reason = "${reason}", dateAndTime = "${message.createdAt}", staffID = "${bot.user.id}", staffName = "${bot.user.username}"`);
      return;
    }
  };


  if (message.content.startsWith(useprefix)) {
    let command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${useprefix}${command.name} ${command.usage}\``;
        }

        return message.reply(reply);
    }

    try {
      command.execute(Discord, bot, connection, message, args, useprefix);
    } catch (error) {
        console.error(error);
        message.reply('There was an unexpected error in executing that command, please check the bot logs for more information.');
    }
  } else {
    // isn't command, affect balance by message
    if (updated == "no") {
      let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Important Notice")
        .setColor("#ff0000")
        .setDescription("It seems this guild has not been updated to utilise my new features, please get an admin to run the following command to enable these features!")
        .addField("Command", `${useprefix}updateguild`)
        .setFooter(`Any questions please contact: customer_support@jconet.co.uk or visit our website and use our live chat https://jconet.co.uk`);
      message.channel.send(errorEmbed).catch(err => console.error(err));
    }
    let coinstoadd = 1;
    let newBal;

    let result = await connection.query(`SELECT coins FROM money WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.error(err));
    let results = result[0];
    if (results.length == 0) {
      await connection.query(`INSERT INTO money SET guildID = "${message.guild.id}", guildName = "${message.guild.name}", userID = "${message.author.id}", userName = "${message.author.username}", coins = ${coinstoadd}`).catch(err => console.error(err));
    } else {
      newBal = results[0].coins + coinstoadd;
      await connection.query(`UPDATE money SET coins = ${newBal} WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.error(err));
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
      button.channel.send(`Cancelled setup embed for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
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
      await connection.query(`UPDATE guildConfig SET welcomeChannelName = "${button.channel.name}", welcomeChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`Welcome channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "system") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      // set system channel
      await connection.query(`UPDATE guildConfig SET systemChannelName = "${button.channel.name}", systemChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`System channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "announcement") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      button.message.delete();
      // set announcement channel
      await connection.query(`UPDATE guildConfig SET announcementChannelName = "${button.channel.name}", announcementChannelID ="${button.channel.id}" WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`Announcement channel set to ${button.channel} in ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  };

  // enable messages
  if (button.id == "enablewelc") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // enable welcome and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET welcomeEnabled = true WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have enabled welcome messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "enableann") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // enable annoucnements and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET announcementEnabled = true WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have enabled announcement messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "enablenewfeat") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // enable newfeatures and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET newfeatureEnabled = true WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have enabled new features messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  };

  // disable messages
  if (button.id == "disablewelc") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // enable welcome and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET welcomeEnabled = false WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have disabled welcome messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "disableann") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // enable annoucnements and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET announcementEnabled = false WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have disabled announcement messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  } else if (button.id == "disablenewfeat") {
    button.defer();
    if (button.clicker.member.hasPermission("ADMINISTRATOR")) {
      // disable newfeatures and update the embed to say its enabled and remove button
      button.message.delete();
      await connection.query(`UPDATE guildConfig SET newfeatureEnabled = false WHERE guildID = "${button.guild.id}"`).catch(err => console.error(err));
      button.channel.send(`You have disabled new features messages for ${button.guild.name}.`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
      button.clicker.user.send(`You tried to use admin only buttons in ${button.guild.name} and we thought we would let you know that you cannot do that.`);
    };
  };
});

// twitch integration

const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { EnvPortAdapter, EventSubListener } = require('twitch-eventsub');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const listener = new EventSubListener(apiClient, new EnvPortAdapter({
  hostName: 'chloe-hosting.herokuapp.com'
}), process.env.EVENT_SECRET);
if (listener) {
  console.log("Twitch Listener Working.")
}
listener.listen();

async function newSubscription(userName) {
  let user = await apiClient.helix.users.getUserByName(userName);
  const userId = user.id;

  const streamChannel = bot.channels.cache.get('818685046302965801')
  const bigluv = bot.emojis.cache.find(emoji => emoji.name === "KiyKillsBigLuv");
  const letsgo = bot.emojis.cache.find(emoji => emoji.name === "KiyKillsLetsGo");

  const onlineSubscription = await listener.subscribeToStreamOnlineEvents(userId, e => {
    streamChannel.send(`What is up @everyone? ${e.broadcasterDisplayName} just went live! Catch the good vibes at https://twitch.tv/${userName} ${letsgo} ${bigluv}!!!!`);
  });
};

newSubscription("kiykills");