const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!member.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, I am not allowed to let non administrator users to run this command.");
    let roleMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!roleMember) return message.reply("Please remember to add a target user to the command by either mentioning them or typing out their name. Thank you.");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Please enter a role to apply");
    let gRole = message.guild.roles.find('name', role);
    if(!gRole) return message.reply("Please enter a valid role for this server!");

    if(!roleMember.roles.has(gRole.id)) return message.reply("That user doesn't have that role.");
    await(roleMember.removeRole(gRole.id));

    try{
        await roleMember.send(`You have been unassigned the role ${gRole.name} in the server ${message.guild.name}.`)
    }catch(e) {
        message.channel.send(`<@${roleMember.id}> has been unassigned the role ${gRole.name}.`)
    };

};

module.exports.help = {
    name: "removerole"
}