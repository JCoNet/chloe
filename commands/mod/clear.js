module.exports = {
  name: "clear",
  description: "Delete the last X number of messages!",
  args: true,
  usage: '<number to delete>',
  async execute(Discord, bot, connection, message, args, useprefix) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`OOF <@!${message.author.id}>. You do not appear to have access to this command, you need to be able to manage messages to do this!`);
    if (!args[0]) return message.channel.send(`<@!${message.author.id}>, You did not specify a number of messages to delete.`);
    let toDelete = Math.floor(parseInt(args[0])+1);
    // console.log(toDelete)
    message.channel.bulkDelete(toDelete).then(() => {
      message.channel.send(`Deleted ${args[0]} messages.`).then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
    });
  },
};
