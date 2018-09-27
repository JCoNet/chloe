const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let id = "481872616508882944";
	let embed = new Discord.RichEmbed()
    .setTitle("I Want It That Way")
    .setDescription("By the Backstreet Boys")
    .setColor("#33fede")
    .addField("Link to song", "['Here']('https://www.youtube.com/watch?v=4fndeDfaWCg')")
    .addField("Lyrics", "Yeah-eh-heah \
You are my fire \
The one desire \
Believe when I say \
I want it that way \
But we are two worlds apart \
Cant reach to your heart \
When you say \
That I want it that way \
Tell me why \
Aint nothin but a heartache \
Tell me why \
Aint nothin but a mistake \
Tell me why \
I never want to hear you say \
I want it that way \
Am I your fire? \
Your one desire \
Yes I know its too late \
But I want it that way \
Tell me why \
Aint nothin but a heartache \
Tell me why \
Aint nothin but a mistake \
Tell me why \
I never want to hear you say \ \
I want it that way");
    let ebed2 = new Discord.RichEmbed()
    .addField("Continuation", "Now I can see that weve fallen apart \
From the way that it used to be Yeah \
No matter the distance  \
I want you to know \
That deep down inside of me \
You are my fire \
The one desire \
You are (You are you are you are) \
Dont want to hear you say \
Aint nothin but a heartache \
Aint nothin but a mistake \
(Dont want to hear you say) \
I never want to hear you say \
I want it that way \
Tell me why \
Aint nothin but a heartache \
Tell me why \
Aint nothin but a mistake \
Tell me why \
I never want to hear you say \
I want it that way \
Tell me why \
Aint nothin but a heartache \
Aint nothin but a mistake \
Tell me why \
I never want to hear you say \
(Never want to hear you say it) \
I want it that way \
Cause I want it that way");
  id.send(embed);
  id.send(embed2);
}

module.exports.help ={
  name: "queen"
}