const Discord = require("discord.js");

module.exports.run = async (bot, message, args, connection, useprefix) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the required permissions to run this command.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    
    let operation = args[0].toLowerCase().trim();
    let user = message.mentions.members.first() || await message.guild.members.fetch(args[1]) || message.guild.members.cache.find(u => u.name.toLowerCase().includes(args[1].toLowerCase()));
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[2].toLowerCase()));

    // check the arguments and variables exist.
    if (!operation) return message.channel.send("Please ensure you specify the operation for this command. (add/remove)").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!user) return message.channel.send("Please ensure you specify a user either by name, ID or mention.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!role) return message.channel.send("Please ensure you specify a role either by name, ID or mention.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    if (operation != "add" || operation != "remove") return message.channel.send("Please only specify valid command operations. (add/remove)").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    // check roles and permissions
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("The specified user is ranked the same or higher than you, therefore I cannot allow you to modify this user's roles.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (message.members.roles.highest.position <= role.position) return message.channel.send("The specified role is ranked the same as or higher than your highest ranked role, therefore I cannot let you assign it to anyone.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    // add/remove the role
    if (operation == "add") {
        user.roles.add(role.id).catch(err => console.error(err));
        message.channel.send(`You successfully added ${user} to the ${role} role!`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else if (operation == "remove") {
        user.roles.remove(role.id).catch(err => console.error(err));
        message.channel.send(`You successfully removed ${user} from the ${role} role!`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    }
    
    await message.delete();
};

module.exports.help = {
    name: "role"
};