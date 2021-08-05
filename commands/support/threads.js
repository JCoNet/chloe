module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            // create thread
            let threadName;
            let threadDescription;
            let filter = m => m.author.id == message.author.id;

            await message.reply("What is the desired name of the thread?");
            try {
                let reply1 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                threadName = reply1.first().content;
                console.log(threadName);
            } catch {
                message.reply("No response was said in time. Name not set. Command cancelled.");
            };

            await message.reply("What is the desired description of the thread?");
            try {
                let reply2 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                threadDescription = reply2.first().content;
                console.log(threadDescription);
            } catch {
                message.reply("No response was said in time. Description not set. Command cancelled.");
            };
            
            // await message.reply("What is the desired description of the thread?");
            // threadDescription = await message.channel.awaitMessages(m => m.author.id == message.author.id,{ time: 30000, max: 1, errors: ['time'] }).catch(message.reply("No response was said in time."));

            try {
                let threadChannel = await message.channel.threads.create({
                    name: threadName,
                    autoArchiveDuration: 60,
                    reason: `${message.author.username} requested the channel be created.`,
                });
                threadChannel.send(threadDescription)
                console.log(`Thread made: ${threadChannel.id}`)
            } catch {
                err => console.log(err);
            };
        };
    },
};