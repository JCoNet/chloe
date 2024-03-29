require('dotenv').config({ path: '.env' });

const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const mysql = require("mysql2/promise");
const fs = require("fs");
const stats = require("./package.json");
const config = require("./botconfig.json");
const { AsciiTable3 } = require('ascii-table3');

const Intents = Discord.Intents;
const Permissions = Discord.Permissions;
const bot = new Discord.Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_INVITES,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGE_TYPING,
]});

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
  console.log("Connected to the secure JCoNet DB!");
};

console.log(`${config.test}`);

var table = new AsciiTable3('Chloe Guilds')
.setHeading('Command File', 'Loaded')
.setWidths([40,40])
.setCellMargin(0)

const globalCommands = [];
const guildCommands = [];
bot.commands = new Discord.Collection();
const globalCommandFolders = fs.readdirSync('globalCommands');
const guildCommandFolders = fs.readdirSync('guildCommands');

for (const folder of globalCommandFolders) {
	const globalCommandFiles = fs.readdirSync(`globalCommands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of globalCommandFiles) {
		const command = require(`./globalCommands/${folder}/${file}`);

		if (command.data.name) {
      globalCommands.push(command.data.toJSON());
      bot.commands.set(command.data.name, command);
      table.addRow(file.split('.').slice(0, -1).join('.'), 'Success');
      continue;
    } else {
      table.addRow(file.split('.').slice(0, -1).join('.'), 'Error');
      continue;
    }
	}
}

for (const folder of guildCommandFolders) {
	const guildCommandFiles = fs.readdirSync(`guildCommands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of guildCommandFiles) {
    const command = require(`./guildCommands/${folder}/${file}`);

    if (command.data.name) {
      guildCommands.push(command.data.toJSON());
      bot.commands.set(command.data.name, command);
      table.addRow(file.split('.').slice(0, -1).join('.'), 'Success');
      continue;
    } else {
      table.addRow(file.split('.').slice(0, -1).join('.'), 'Error');
      continue;
    }
  }
}

table.setStyle('unicode-single');
console.log(table.toString());

let botConf;

// connect to correct bot with login token
if (process.env.ENV === "production") {
  bot.login(process.env.token);
} else {
  bot.login(process.env.betatoken);
}


bot.once('ready', async () => {
  bot.database = connection;

  //set up botConf
  var d = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  let result = await connection.query("SELECT statusMessage, statusType, defaultPrefix FROM defaultConfig");
  botConf = result[0];
  // set up the bot status items when it conencts to api
  console.log(`Chloe sucessfully activated on ${d}, now ready for service. Operating on version ${stats.version} and framework ${stats.frmwrk}. Environment: ${process.env.ENV}`);
  // bot.user.setActivity(`${botConf[0].statusMessage}`, {type: `${botConf[0].statusType}`});
  // bot.user.setStatus("dnd");

  // Figure out why this keeps reverting to basic online and removing message and presence status
  bot.user.setPresence({
    status: "online",  // You can show online, idle... Do not disturb is dnd
    activities: [{
        name: `${botConf[0].statusMessage}`,  // The message shown
        type: `${botConf[0].statusType}` // PLAYING, WATCHING, LISTENING, STREAMING,
    }]
  });

  let botID;
  // register commands
  if (process.env.ENV === "production") {
    botID = process.env.botid;
  } else {
    botID = process.env.botbetaid;
  };

  if (process.env.ENV === "production") {
    const rest = new REST({
      version: "9",
    }).setToken(process.env.token)
  } else {
    const rest = new REST({
      version: "9",
    }).setToken(process.env.betatoken)
  }


  try {
    let result = await connection.query(`SELECT guildID, administratorRoleID, moderatorRoleID FROM guildConfig WHERE guildID = "${process.env.testserver}"`).catch(err => console.error(err));
    let results = result[0];
    var len = results.length;
    for (var i = 0; i < (len); i++) {
      let guild = bot.guilds.cache.get(results[i].guildID);

      const commands = await guild.commands.set(guildCommands).then(console.log("Guild commands set."));

      // await rest.put(Routes.applicationGuildCommands(botID, results[i].guildID), {
      //   body: guildCommands
      // }).then(console.log("Guild Commands set"));

      let permission1 = {
        id: guild.roles.everyone.id,
        type: 'ROLE',
        permission: false,
      };
      let permission2 = {
        id: results[i].administratorRoleID,
        type: 'ROLE',
        permission: true,
      };
      let permission3 = {
        id: results[i].moderatorRoleID,
        type: 'ROLE',
        permission: true,
      };

      const permissions = commands.map(command => ({ id: command.id, permissions: [permission1, permission2, permission3] }));

      await guild.commands.permissions.set({ fullPermissions: permissions });
      console.log("Guild command permissions set.")
    };


    if (process.env.ENV === "production") {
      await rest.put(Routes.applicationCommands(botID), {
        body: globalCommands
      });

      console.log("Chloe has registered all commands.");
    } else {
      return console.log("No global commands can be set as currently in test mode.");
    }
  } catch (error) {
    if (error) {
      console.error(error);
    };
  };
});

bot.on('guildCreate', async guild => {
  let defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
  let sysChannel = guild.sysChannel;
  let sysChannelName;
  let sysChannelID;
  if (!sysChannel) {
    sysChannelName = defaultChannel.name;
    sysChannelID = defaultChannel.id;
    sysChannel = defaultChannel;
  } else {
    sysChannelName = guild.sysChannel.name;
    sysChannelID = guild.sysChannel.id;
  };

  let guildOwner = await guild.fetchOwner();

  let result = await connection.query(`SELECT * FROM guildConfig WHERE guildID="${guild.id}"`).catch(err => console.error(err));
  let results = result[0];

  if (results.length == 0) {
    await connection.query(`INSERT INTO guildConfig SET guildName = "${guild.name}", guildID = "${guild.id}", prefix = "${botConf[0].defaultPrefix}", ownerName = "${guildOwner.user.username}", ownerID = "${guildOwner.user.id}", systemChannelName = "${sysChannelName}", systemChannelID = "${sysChannelID}", announcementChannelName = "${defaultChannel.name}", announcementChannelID = "${defaultChannel.id}", welcomeChannelName = "${defaultChannel.name}", welcomeChannelID = "${defaultChannel.id}", welcomeMessage = "Welcome to the server!"`).catch(err => console.error(err));
  };

  await defaultChannel.send("Thank you for adding me to your server do chloe/help to find out all the commands I offer! Owner or admin please do /configure to complete my setup for this guild.").catch(err => console.error(err));

  let newGuildEmbed = new Discord.MessageEmbed()
    .setColor('#24d3f2')
    .setTitle("Chloe Beta Requirements")
    .setDescription("Using Chloe Beta means you are required to follow our requirements including regular feedback about the bot useage and reporting any bugs.")
    .setURL("https://chloe.jconet.co.uk/")
    .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk/developers')
    .setThumbnail(bot.user.displayAvatarURL())
    .addField("Requirements", "The introduction of Chloe Beta opens up many issues such as possibilities of crashes and commands not working. the requirements on you are that you do not spam commands and report any commands not working or not showing the results properly to our proper communication options below. You are also required to give us feedback and thoughts on how the bot is working in your server and how it operates. Other suggestions to changing the command layouts etc are welcomed.")
    .addField("Email us", 'chloe_beta@jconet.co.uk')
    .addField("Talk to our team", '[JCoNet Live Support](https://tawk.to/jcnsupport "JCoNet Support Live Chat Link")')
    .addField("Submit a ticket", '[JCoNet Knowledge Base](https://jconet.tawk.help "JCoNet Knowledge Base Link (tickets submitted through here)")')
    .addField('Quickly Re-Add Chloe Beta if we told you to remove and re-add her.', '[Invite link for Chloe Beta](https://discord.com/oauth2/authorize?client_id=845392640920518666&permissions=8&scope=bot "Invite for chloe beta")')
    .setFooter(`Lead developer: ${stats.author}`);

  await sysChannel.send({embeds: [newGuildEmbed]});

});

bot.on('guildDelete', async guild => {
  connection.query(`DELETE FROM guildConfig WHERE guildID = '${guild.id}'`).catch(err => console.error(err));
  connection.query(`DELETE FROM money WHERE guildID = '${guild.id}'`).catch(err => console.error(err));
});

bot.on('guildMemberAdd', async member => {
  var date = new Date();
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
    let owner = await member.guild.fetchOwner();
    let welcomeEmbed = new Discord.MessageEmbed()
    .setColor("#3efa67")
    .setTitle("New User Joined")
    .setDescription(`${welcomeMessage}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor(`${member.guild.name}`, `${serverIcon}`)
    .addFields([
      {name: "name", value: `${member.user.username}`, inline: true},
      {name: "Join date", value: `${date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2, '0')+'-'+date.getDate().toString().padStart(2, '0')}`, inline: true},
      {name: "Join time", value: `${date.getHours().toString().padStart(2, '0')+':'+date.getMinutes().toString().padStart(2, '0')+':'+date.getSeconds().toString().padStart(2, '0')}`, inline: true},
      {name: "mention", value: `<@!${member.user.id}>`},
    ])
    .setFooter(`The owner of this server is ${owner.user.username}`);

    welcomeChannel.send({embeds: [welcomeEmbed]});

  } else {
    return;
  };

  if (member.guild.id === "818873733875236915") {
    try{
      member.roles.add("873259003906523227");
    } catch {
      err => console.error(err);
    }
  }

});

bot.on('messageCreate', async message => {
  if (message.author.bot) return;
  
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
      if (message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("ADMINISTRATOR")) {
        let owner = await message.guild.fetchOwner();
        let staffBL = new Discord.MessageEmbed()
        .setTitle("Your action is required")
        .setDescription("I have detected one of your staff members saying a blacklisted word and have deleted the message. Please ban or kick at your discretion. I am programmed to ban anyone that says these words who is not staff (I cannot ban staff)")
        .addFields([
          {name: "Server", value: `${message.guild.name}`, inline: true},
          {name: "Staff Member", value: `${message.author.username}`, inline: true},
          {name: "Detected Word", value: `${detected}`, inline: true},
        ])
        .setFooter("This is automated for the safety of your server by JCoNet Development.");
        await message.delete().catch(err => console.error(err));
        owner.send({embeds: [staffBL]});
        return;
      };
      
      let blEmbed = new Discord.MessageEmbed()
      .setTitle("Automated Ban")
      .setDescription("A user has said a blacklisted word and been automatically banned. This deleted their last 7 days of messages.")
      .addFields([
        {name: "User", value: `${message.author.username}`, inline: true},
        {name: "User ID", value: `${message.author.id}`, inline: true},
      ])
      .setFooter("This is an automated action to protect the server on the behalf of JCoNet Development.");

      let reason = "You said a word on the blacklist. That offence is an automated ban.";
      await message.author.send(`You have been banned from ${message.guild.name} for ${reason} with the duration of 7 days.`).catch(err => console.error(err));
      let banned = message.guild.members.cache.get(message.author.id);
      await banned.ban({days: 7, reason: reason}).then(message.channel.send({embeds: [blEmbed]})).catch(err => console.error(err));
      await connection.query(`INSERT INTO incidents SET serverID = "${message.guild.id}", serverName = "${message.guild.name}", userID = "${message.author.id}", userName = "${message.author.username}", type = "  AUTOMATED BAN", reason = "${reason}", dateAndTime = "${message.createdAt}", staffID = "${bot.user.id}", staffName = "${bot.user.username}"`);
      return;
    }
  };


  // isn't command, affect balance by message
  if (updated == "no") {
    let errorEmbed = new Discord.MessageEmbed()
      .setTitle("Important Notice")
      .setColor("#ff0000")
      .setDescription("It seems this guild has not been updated to utilise my new features, please get an admin to run the following command to enable these features!")
      .addField("Command", `/updateguild`)
      .setFooter({text: `Any questions please contact: customer_support@jconet.co.uk or visit our website and use our live chat https://jconet.co.uk`});
    message.channel.send({embeds: [errorEmbed]}).catch(err => console.error(err));
  }
  let coinstoadd = 1;
  let newBal;

  let coinresult = await connection.query(`SELECT coins FROM money WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.error(err));
  let coinresults = coinresult[0];
  if (coinresults.length == 0) {
    await connection.query(`INSERT INTO money SET guildID = "${message.guild.id}", guildName = "${message.guild.name}", userID = "${message.author.id}", userName = "${message.author.username}", coins = ${coinstoadd}`).catch(err => console.error(err));
  } else {
    newBal = coinresults[0].coins + coinstoadd;
    await connection.query(`UPDATE money SET coins = ${newBal} WHERE guildID = "${message.guild.id}" AND userID = "${message.author.id}"`).catch(err => console.error(err));
  };

});

bot.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    let command = bot.commands.get(interaction.commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(interaction.commandName));
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({content: `There was an unexpected error in executing that command. Error:\n\`${error}\`\nPlease alert JCoNet to this error by screenshotting this message or telling them to check console at timestamp:\n\`${Date.getUTCDate()}/${Date.getUTCMonth()+1}/${Date.getUTCFullYear()} @ ${Date.getUTCHours()}:${Date.getUTCMinutes()}:${Date.getUTCSeconds()}:${Date.getUTCMilliseconds()}\``, ephemeral: true});
    }
  };
});