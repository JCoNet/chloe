const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.databaseName}:${process.env.databasePassword}@cluster0-sltlx.mongodb.net/${process.env.databaseName}`, {
  useNewUrlParser: true
});
const Money = require("./models/money.js");
const Prefixes = require("./models/prefixes.js");

var d = new Date();

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

let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();

bot.on('ready', () => {
  console.log(`Alessa awoken on ${date+1} at ${time}`);
   // bot.user.setActivity("the epic failz of Army_Killa44",{type: "STREAMING", url: "https://www.twitch.tv/army_killa44"});
   // bot.user.setActivity("Sick tunes w/MonsterCat", {type: "STREAMING", url: "https://www.twitch.tv/monstercat"});
   // bot.user.setActivity("Development in progress.", {type: "WATCHING"});
   // bot.user.setStatus('dnd');
   // bot.user.setActivity("Some rubbish go down in DMs.", {type: "WATCHING"});
   bot.user.setActivity(`in ${bot.guilds.size} discord servers.`, {type: "PLAYING"});
  // bot.user.setActivity(`the clock. Going offline for maintenance in 2 min`, {type: "WATCHING"});
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
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
  } else {
    // console.log("b");
    let coinstoadd = Math.ceil(Math.random() * 50);
    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
      if (err) console.log(err);
      if (!money) {
        const newMoney = new Money({
          userID: message.author.id,
          serverID: message.guild.id,
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
