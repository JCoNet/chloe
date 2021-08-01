module.exports = {
  name: "say",
  description: "Say a message as the bot!",
  args: true,
  usage: '<message to say>',
  async execute(Discord, bot, connection, message, args, useprefix) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`OOF <@!${message.author.id}>. You do not appear to have access to this command, you need to be able to manage messages to do this!`);
    let botmessage = args.join(" ");
    await message.delete().catch(err => console.error(err));
    message.channel.send(botmessage).catch(err => console.error(err));
  },
};