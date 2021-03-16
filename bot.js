const Discord = require("discord.js");
const bot = new Discord.Client();
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.databaseName}:${process.env.databasePassword}@cluster0-sltlx.mongodb.net/${process.env.databaseName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('DB connected!')).catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});
const config = require("./botconfig.json");
const fs = require("fs");
const Money = require("./models/money.js");
const Prefixes = require("./models/prefixes.js");
const generalBotConf = require("./models/generalBotConfig.js");
if (!generalBotConf) {
  const standardConfig = new generalBotConf({
    statusMessage: "Fresh build",
    statusType: "PLAYING",
    prefix: "bot/"
  })

  standardConfig.save().catch(err => console.log(err));
} else {
  return;
}
const stats = require("./package.json");

var d = new Date();

console.log(`${config.test}`);

bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, file) => {

  if (err) consol.log(err);

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

bot.login(process.env.token);

bot.on('ready', () => {
  console.log(`Chloe sucessfully activated on ${d}, now ready for service.`);
  // bot.user.setActivity("Service development down time.", {type: "WATCHING"});
  bot.user.setActivity("over safety for the servants of the void.", {type: "WATCHING"});
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Sorry but I currently do not function within Direct Messaging channels. This might be implemented in the future updates JCoNet Discord implement. Sorry for the inconvenience.");
  let useprefix;

  const prefixes = await Prefixes.findOne({serverID: message.guild.id}, (err, prefixes) => {
    if (!prefixes) {
      const newServer = new Prefixes({
        serverID: message.guild.id,
        serverName: message.guild.name,
        prefix: config.prefix
      });
      newServer.save().catch(err => CompositionEvent.log(err));
      prefixes = Prefixes.findOne({serverID: message.guild.id});
      useprefix = prefixes.prefix;
      // console.log(`prefix set to: ${useprefix}`);
    }

    useprefix = prefixes.prefix;
  })

  // let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content.startsWith(useprefix)) {
    // console.log("a");
    let commandfile = bot.commands.get(cmd.slice(useprefix.length));
    if (commandfile) commandfile.run(bot, message, args, useprefix);
    // message.reply("Sorry but my services are currently down for development and maintenance. I hope to have them back up shortly.");
  } else {
    // console.log("b");
    let coinstoadd = 1;
    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
      if (err) console.log(err);
      if (!money) {
        const newMoney = new Money({
          userID: message.author.id,
          userName: message.author.username,
          serverID: message.guild.id,
          serverName: message.guild.name,
          money: coinstoadd
        })

        newMoney.save().catch(err => console.log(err));
      } else {
        money.money = money.money + coinstoadd;
        money.save().catch(err => console.log(err));
      }
    })
  };

});
