module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove> <name> [add only: <private/public> <reason -optional>]",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            // create thread
            let threadName = args[1];
            let threadCategory = args[2];
            let threadType = "";
            let threadDescription = "";

            if (threadCategory == "private") {
                threadType = "GUILD_PRIVATE_THREAD";
            } else if (threadCategory == "public") {
                threadType = "GUILD_PUBLIC_THREAD";
            } else {
                message.reply("Please specify a valid category type (public/private)");
            };

            if(args[3]) {
                threadDescription = args[3];
            } else {
                threadDescription = "A new thread!";
            };

            message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                type: threadType,
                reason: threadDescription,
            }).then(threadChannel => threadChannel.send(threadDescription)).catch(err => console.error(err.message));
        };
    },
};