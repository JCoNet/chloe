module.exports = {
  name: "pingall",
  description: "Send an @everyone ping as the bot!",
  args: true,
  aliases: ["announce", "broadcast"],
  async execute(Discord, bot, connection, message, args, useprefix) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`OOF <@!${message.author.id}>. You do not appear to have access to this command, you need to be able to manage messages to do this!`);
    let botmessage = args.join(" ");
    await message.delete().catch(err => console.error(err));
    message.channel.send(`@everyone ${botmessage}`);
  },
};