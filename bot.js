const Discord = require("discord.js");
const mysql = require("mysql");
const fs = require("fs");
const bot = new Discord.Client();
// mongoose.connect(`mongodb+srv://${process.env.databaseName}:${process.env.databasePassword}@cluster0-sltlx.mongodb.net/${process.env.databaseName}`, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// }).then(() => console.log('DB connected!')).catch(err => {
//   console.log(`DB Connection Error: ${err.message}`);
// });
const connection = mysql.createConnection({
  host: `${process.env.dbHost}`,
  user: `${process.env.dbUser}`,
  password: `${process.env.dbPass}`,
  database: `${process.env.dbName}`
});
connection.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected to secure DB!");
});
const config = require("./botconfig.json");
// const Money = require("./models/money.js");
// const Prefixes = require("./models/prefixes.js");
// const generalBotConfig = require("./models/generalBotConfig.js");
// const stats = require("./package.json");

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

// let botConf;
// generalBotConfig.findOne({}, (err, generalBotConf) => {
//   if (err) console.log(err);
//   if (!generalBotConf) {
//     const standardConfig = new generalBotConfig({
//       statusMessage: "Fresh build",
//       statusType: "PLAYING",
//       prefix: "bot/"
//     })

//     standardConfig.save().catch(err => console.log(err));
//     console.log("Database collection generalBotConfig created and default values imported.")
//   } else {
//     console.log("Database collection generalBotConfig already exists and contains config data.");
//     botConf = generalBotConf;
//   }
// });

let botConf;
connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT statusMessage, statusType, defaultPrefix FROM defaultConfig", function(err, result) {
    if (err) throw err;
    botConf = result[0];
  });
});

// bot.login(process.env.token);
bot.login(process.env.betatoken);

bot.on('ready', () => {
  console.log(`Chloe sucessfully activated on ${d}, now ready for service.`);
  // bot.user.setActivity("Service development down time.", {type: "WATCHING"});
  // bot.user.setActivity("over safety for the servants of the void.", {type: "WATCHING"});
  bot.user.setActivity(`${botConf.statusMessage}`, {type: `${botConf.statusType}`});
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Sorry but I currently do not function within Direct Messaging channels. This might be implemented in the future updates JCoNet Discord implement. Sorry for the inconvenience.");
  let useprefix;

  // const prefixes = await Prefixes.findOne({serverID: message.guild.id}, (err, prefixes) => {
  //   if (!prefixes) {
  //     const newServer = new Prefixes({
  //       serverID: message.guild.id,
  //       serverName: message.guild.name,
  //       prefix: botConf.defaultPrefix
  //     });
  //     newServer.save().catch(err => CompositionEvent.log(err));
  //     prefixes = Prefixes.findOne({serverID: message.guild.id});
  //     useprefix = prefixes.prefix;
  //     // console.log(`prefix set to: ${useprefix}`);
  //   }

  //   useprefix = prefixes.prefix;
  // })

  connection.connect(function(err) {
    if (err) console.log(err);
    connection.query(`SELECT prefix FROM prefixes WHERE guildID = '${message.guild.id}'`, function(err, result) {
      if (err) console.log(err);
      if (!result[0]) connection.query(`INSERT INTO prefixes (guildID, prefix) VALUES ('${message.guild.id}', '${botConf.defaultPrefix}')`, function(err, result){
        if (err) console.log(err);
        useprefix = botConf.defaultPrefix;
      });
      useprefix = result[0].prefix;
    });
  });

  // let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content.startsWith(useprefix)) {
    // console.log("a");
    let commandfile = bot.commands.get(cmd.slice(useprefix.length));
    if (commandfile) commandfile.run(bot, message, args, useprefix, connection);
    // message.reply("Sorry but my services are currently down for development and maintenance. I hope to have them back up shortly.");
  } else {
    // console.log("b");
    let coinstoadd = 1;
    // Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
    //   if (err) console.log(err);
    //   if (!money) {
    //     const newMoney = new Money({
    //       userID: message.author.id,
    //       userName: message.author.username,
    //       serverID: message.guild.id,
    //       serverName: message.guild.name,
    //       money: coinstoadd
    //     })

    //     newMoney.save().catch(err => console.log(err));
    //   } else {
    //     money.money = money.money + coinstoadd;
    //     money.save().catch(err => console.log(err));
    //   }
    // })

    connection.connect(function(err) {
      if (err) console.log(err);
      connection.query(`SELECT coins FROM money WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`, function(err, result) {
        if (err) console.log(err);
        if (!result[0]) connection.query(`INSERT INTO money (guildID, guildName, userID, userName, coins) VALUES '${message.guild.id}', '${message.guild.name}', '${message.author.id}', '${message.author.username}', '${coinstoadd}'`, function(err, result) {
          if (err) console.log(err);
        });
        newBal = result[0].coins + coinstoadd;
        connection.query(`UPDATE money SET coins = '${newbal}' WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`, function(err, result) {
          if (err) console.log(err);
        });
      });
    });
  };

});
