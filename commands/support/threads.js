module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove> <name> [add only: <reason -optional>]",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            // create thread
            let threadName = args[1];
            let threadDescription = "";

            if(args[2]) {
                threadDescription = args[2];
            } else {
                threadDescription = "A new thread!";
            };

            let threadChannel = message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                reason: threadDescription,
            }).catch(err => console.error(err.message));

            threadChannel.add({
                member: message.author,
                reason: "Created the thread request",
            }).catch(err => console.error(err));

            threadChannel.send(threadDescription).catch(err => console.error(err));

            console.log(`Thread created: ${threadChannel}`);
        };
    },
};