const Discord = require("discord.js");
const mysql = require("mysql2");
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
// connection.connect(function(err) {
//   if (err) console.log(err);
//   console.log("Connected to secure DB!");
// });
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

connection.query("SELECT statusMessage, statusType, defaultPrefix FROM defaultConfig", function(err, result) {
  if (err) console.log(err);
  botConf = result[0];
});


// bot.login(process.env.token);
bot.login(process.env.betatoken);

bot.on('ready', () => {
  console.log(`Chloe sucessfully activated on ${d}, now ready for service.`);
  bot.user.setActivity(`${botConf.statusMessage}`, {type: `${botConf.statusType}`});
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("JCoNet Development is restricting the number of variables that might cause me issues, meaning I am prohibited from running commands in DM. Sorry for the inconvenience.");
  
  let useprefix;

  connection.query(`SELECT prefix FROM prefixes WHERE guildID = '${message.guild.id}'`, function(err, result) {
    console.log("Test1");
    if (err) console.log(err);
    console.log(`result is: "${result}" this is equal to a no record found.`);
    console.log("Test2");
    if (result.length == 0) {
      connection.query(`INSERT INTO prefixes (guildID, prefix) VALUES ('${message.guild.id}', '${botConf.defaultPrefix}')`, function(err, result){
        console.log("Test3");
        if (err) console.log(err);
        console.log("Test4");
        useprefix = botConf.defaultPrefix;
        console.log("Test5");
      });
    } else {
      console.log("Test6");
      console.log(result[0])
      // useprefix = result[0].prefix;
      console.log("Test7");
    };
  });

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content.startsWith(useprefix)) {
    let commandfile = bot.commands.get(cmd.slice(useprefix.length));
    if (commandfile) commandfile.run(bot, message, args, useprefix, connection);
  } else {
    let coinstoadd = 1;

    connection.query(`SELECT coins FROM money WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`, function(err, result) {
      if (err) console.log(err);
      if (result.length == 0) {
        connection.query(`INSERT INTO money (guildID, guildName, userID, userName, coins) VALUES '${message.guild.id}', '${message.guild.name}', '${message.author.id}', '${message.author.username}', '${coinstoadd}'`, function(err, result) {
          if (err) console.log(err);
        });
      } else {
        var newBal = result[0].coins + coinstoadd;
        connection.query(`UPDATE money SET coins = '${newbal}' WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`, function(err, result) {
          if (err) console.log(err);
        });
      };
    });
  };

});
