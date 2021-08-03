module.exports = {
    name: "treads",
    description: "Warn a user!",
    args: true,
    usage: "<add/remove> <name> [add only: <description -optional>]",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[1]=="add") {
            // create thread
            let threadName = args[2];
            let threadDescription = "";
            if(args[3]) {
                threadDescription = args[3];
            } else {
                threadDescription = "A new thread!";
            };

            let thread = message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                reason: threadDescription,
            }).then(threadChannel => message.channel.send(`<@!${message.author.id}> I have made your selected thread! ${threadChannel}`)).catch(err => console.error(err.message));
        };
    },
};