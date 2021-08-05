module.exports = {
  name: "pingall",
  description: "Send an @everyone ping as the bot!",
  args: true,
  aliases: ["announce", "broadcast"],
  async execute(Discord, bot, connection, message, args, useprefix) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`OOF <@!${message.author.id}>. You do not appear to have access to this command, you need to be able to manage messages to do this!`);
    let botmessage = args.join(" ");
    await message.delete().catch(err => console.error(err));
    let sent = message.channel.send(`@everyone ${botmessage}`).catch(err => console.log(err));
    if (message.author.username === "JCoDog") {
      sent.react("<:JCNVerifiedDeveloper:872672468765118544> ");
    };
  },
};