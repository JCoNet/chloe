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

            message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                reason: threadDescription,
            }).then(threadChannel => threadChannel.send(threadDescription), threadChannel => threadChannel.add(message.author, "Created Thread!"), threadChannel => console.log(`thread made: ${threadChannel}`)).catch(err => console.error(err.message));
        };
    },
};