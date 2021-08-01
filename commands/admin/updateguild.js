module.exports = {
  name: "updateguild",
  description: "Enables new bot features for your server by updating our database with your server info!",
  args: false,
  async execute(Discord, bot, connection, message, args, useprefix) {
    await message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<@!${message.author.id}>, This command due to it's nature can only be run by a guild admin.`);
    // let defaultChannel = message.guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
    // await connection.query(`UPDATE guildConfig SET twitchChannelName = "${defaultChannel.name}", twitchChannelID = "${defaultChannel.id}" WHERE guildID = "${message.guild.id}"`).catch(err => console.error(err));
    // message.channel.send("Guild updated and now utilising new features.");
    message.channel.send("You are not required to run this command, no changes have been made to the database.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));  
  },
};