module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<new/cancel/close>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        // database table: tickets -> ID, guildName, guildID, userName, userID, ticketID, ticketType, ticketQuestion, ticketResolved
        let filter = m => m.author.id == message.author.id;
        let constructorMessages = [];

        constructorMessages.push({id: message.id});

        if (args[0].toLowerCase() == "new") {
            // new ticket
            let sent = await message.reply("What is the question you wish to ask?");
            constructorMessages.push({id: sent.id});
            try {
                let reply = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply.first().id});
                let ticketQuestion = reply.first().content;
            } catch {
                let error = message.reply("No response was said in time. Question not asked. Command cancelled.");
                constructorMessages.push({id: error1.id});
            };
        } else if (args[0].toLowerCase() == "cancel") {
            // cancel ticket
        } else if (args[0].toLowerCase() == "close") {
            // close ticket
        } else {
            message.reply("Please provide a valid operation. The valid operations for this command are new, cancel and close.");
        };

    },
};