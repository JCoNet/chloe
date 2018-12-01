const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://alessa:${process.env.databasePassword}@cluster0-sltlx.mongodb.net/alessa`, {
  useNewUrlParser: true
});
const Money = require("./models/money.js");

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
  console.log(`Alessa awoken on ${date} at ${time}`);
   // bot.user.setActivity("the epic failz of Army_Killa44",{type: "STREAMING", url: "https://www.twitch.tv/army_killa44"});
   // bot.user.setActivity("Sick tunes w/MonsterCat", {type: "STREAMING", url: "https://www.twitch.tv/monstercat"});
   // bot.user.setActivity("Development in progress.", {type: "WATCHING"});
   // bot.user.setStatus('dnd');
   // bot.user.setActivity("Some rubbish go down in DMs.", {type: "WATCHING"});
   bot.user.setActivity(`About in ${bot.guilds.size} discord servers.`, {type: "PLAYING"});
  
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content.startsWith(prefix)) {
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
  } else {
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
