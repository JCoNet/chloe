const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const talkedRecently = new Set();

// const mysql = require("mysql");
//
// var con = mysql.createConnection({
//   host: config.host,
//   user: config.user,
//   password: config.password
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected")
// })

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
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props)
  });

});

bot.login(process.env.token);

bot.on('ready', () => {
  console.log("Michelle Activated.");
   // bot.user.setActivity("the epic failz of Army_Killa44",{type: "STREAMING", url: "https://www.twitch.tv/army_killa44"});
   // bot.user.setActivity("Developmental tunes w/MonsterCat", {type: "STREAMING", url: "https://www.twitch.tv/monstercat"});
   bot.user.setActivity("Daddy fuck Mommy (Chloe)", {type: "WATCHING"});
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

if (talkedRecently.has(message.author.id)) {
    return;
  } else {
    // the user can type the command ... your command code goes here :)
    if(message.content.toLowerCase().includes("stop")) {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 300000);
      return message.channel.send(`Why should I <@${message.author.id}>? You on your period or something bitch?`);
    };
    if (message.content.toLowerCase.includes("i see")) {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 300000);
      return message.channel.send(`We all see <@${message.author.id}>! Well except for blind twats like you that is.`);
    };
    if (message.content.toLowerCase.includes("oof")) {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 300000);
      return message.channel.send(`Fucking hell <@${message.author.id}>! Do you know how much of a gay cunt you sound like by saying that?`);
    };
    if (message.author.id == "452716084294975507") {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 300000);
      return message.channel.send("Well it appears we have a new law. The Great Fag Lord has just spoken.");
    };
  }; 

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  // if (cmd == `${prefix}stats`) {
  //   message.channel.send(`I am currently being worked on by JCoDog for the release in september of my core version 1.0.0 (i am currently ${info.version})`);
  // };
  // ^^^ Outdate code when embeds added

  // if (cmd === `${prefix}stats`) {
  //
  //   // let bicon =bot.user.displayAvatarURL;
  //   // let statsembed = new Discord.RichEmbed()
  //   //   .setTitle("Bot Statistics")
  //   //   .setDescription("The general information of the bot")
  //   //   .setColor("#33fede")
  //   //   .setThumbnail(bicon)
  //   //   .addField("Name", bot.user.username)
  //   //   .addField("Created on", bot.user.createdAt)
  //   //   .addField("Current version", info.version);
  //   // message.channel.send(statsembed);
  // };

});
