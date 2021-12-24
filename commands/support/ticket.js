module.exports = {
    name: "tickets",
    description: "Manage threads",
    args: true,
    usage: "<new/cancel/close>",
    async execute(Discord, bot, connection, interaction) {
        // database table: tickets -> ID, guildName, guildID, userName, userID, ticketID, ticketType, ticketQuestion, ticketResolved

        if (args[0].toLowerCase() == "new") {
            // new ticket
        } else if (args[0].toLowerCase() == "cancel") {
            // cancel ticket
        } else if (args[0].toLowerCase() == "close") {
            // close ticket
        } else {
            message.reply("Please provide a valid operation. The valid operations for this command are new, cancel and close.");
        };

    },
};