module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove> <name> [add only: <reason -optional>]",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            // create thread
            let threadName = "New Thread!";
            let threadDescription = "A new thread to chat in!";

            await message.reply("What is the desired name of the thread?").then(() => {
                message.channel.awaitMessages(m => m.author.id == message.author.id,
                    { max: 1, time: 30000 }).then(collected => {
                        threadName = collected.first().content;
                        await message.reply("What is the desired description of the thread?").then(() => {
                            message.channel.awaitMessages(m => m.author.id == message.author.id,
                                { max: 1, time: 30000 }).then(collected => {
                                    threadDescription = collected.first().content;
                                }).catch(() => {
                                    message.reply('No answer after 30 seconds, operation canceled.');
                                });
                        });    
                    }).catch(() => {
                        message.reply('No answer after 30 seconds, operation canceled.');
                    });
            });

            message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                reason: threadDescription,
            })
            .then(threadChannel => threadChannel.send(threadDescription))
            .then(threadChannel => console.log(`Thread made: ${threadChannel.id}`))
            .catch(err => console.error(err.message));
        };
    },
};