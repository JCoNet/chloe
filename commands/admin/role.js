module.exports = {
    name: "role",
    description: "Add or remove a role from a user!",
    args: true,
    usage: "<operation> <user> <role>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`<@!${message.author.id}>, You do not have the required permissions to run this command.`).then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        let operation = args[0].toLowerCase();
        let s1 = args[1].toLowerCase();
        let s2 = args[2].toLowerCase();
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(s2);
    
        // check the arguments and variables exist.
        if (!args[0]) return message.channel.send("Please ensure you specify the operation for this command. (add/remove)").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        if (!args[1]) return message.channel.send("Please ensure you specify a user either by name, ID or mention.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        if (!user) return message.channel.send("I could not find the specified user in the server.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        if (!args[2]) return message.channel.send("Please ensure you specify a role either by name, ID or mention.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        if (!role) return message.channel.send("I could not find the specified role in the server.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
    
        if (operation != "add" && operation != "remove") return message.channel.send("Please only specify valid command operations. (add/remove)").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
    
        // check roles and permissions
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("The specified user is ranked the same or higher than you, therefore I cannot allow you to modify this user's roles.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        if (message.member.roles.highest.position <= role.position) return message.channel.send("The specified role is ranked the same as or higher than your highest ranked role, therefore I cannot let you assign it to anyone.").then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
    
        // add/remove the role
        if (operation == "add") {
            await user.roles.add(role.id).catch(err => console.error(err));
            message.channel.send(`You successfully added ${user.user.username} to the ${role.name} role!`).then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        } else if (operation == "remove") {
            await user.roles.remove(role.id).catch(err => console.error(err));
            message.channel.send(`You successfully removed ${user.user.username} from the ${role.name} role!`).then(msg => setTimeout(() => msg.delete(), 3000)).catch(err => console.error(err));
        } else {
            return;
        };
    },
};