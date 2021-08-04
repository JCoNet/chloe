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

            await message.reply("What is the desired name of the thread?")
            threadName = await message.channel.awaitMessages(m => m.author.id == message.author.id,{ max: 1, time: 30000 }).catch(message.reply("No response was said in time."));
            await message.reply("What is the desired description of the thread?")
            threadDescription = await message.channel.awaitMessages(m => m.author.id == message.author.id,{ max: 1, time: 30000 }).catch(message.reply("No response was said in time."));

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