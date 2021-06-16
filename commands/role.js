const Discord = require("discord.js");

module.exports.run = async (bot, message, args, connection, useprefix) => {
    await message.delete();
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the required permissions to run this command.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    let operation = args[0];
    console.log(`arg 0: ${args[0]}`);
    console.log(`op: ${operation}`);
    let s1 = args[1].toLowerCase();
    let s2 = args[2].toLowerCase();
    console.log(`arg 1: ${args[1]} arg 2: ${args[2]}`);
    console.log(`s1: ${s1} s2: ${s2}`);
    let user = message.mentions.members.first() || message.guild.members.cache.get(s1) || message.guild.members.cache.find(u => u.tag === `${s1}`);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(s2) || message.guild.roles.cache.find(r => r. name === `${s2}`);
    console.log(`user: ${user} role: ${role}`);

    // check the arguments and variables exist.
    if (!args[0]) return message.channel.send("Please ensure you specify the operation for this command. (add/remove)").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!args[1]) return message.channel.send("Please ensure you specify a user either by name, ID or mention.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!user) return message.channel.send("I could not find the specified user in the server.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!args[2]) return message.channel.send("Please ensure you specify a role either by name, ID or mention.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (!role) return message.channel.send("I could not find the specified role in the server.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    let check1 = "add";
    let check2 = "remove";
    if (operation != check1 || operation != check2) return message.channel.send("Please only specify valid command operations. (add/remove)").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    // check roles and permissions
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("The specified user is ranked the same or higher than you, therefore I cannot allow you to modify this user's roles.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    if (message.members.roles.highest.position <= role.position) return message.channel.send("The specified role is ranked the same as or higher than your highest ranked role, therefore I cannot let you assign it to anyone.").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));

    // add/remove the role
    if (operation == "add") {
        await user.roles.add(role.id).catch(err => console.error(err));
        message.channel.send(`You successfully added ${user} to the ${role} role!`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else if (operation == "remove") {
        await user.roles.remove(role.id).catch(err => console.error(err));
        message.channel.send(`You successfully removed ${user} from the ${role} role!`).then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
    } else {
        return;
    };
};

module.exports.help = {
    name: "role"
};