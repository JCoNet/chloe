module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            let threadName;
            let threadDescription;
            let filter = m => m.author.id == message.author.id;
            let constructorMessages = [];

            constructorMessages.push({id: message.channel.id});

            let sent1 = await message.reply("What is the desired name of the thread?");
            constructorMessages.push({id: sent1.id});
            try {
                let reply1 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply1.first().id});
                threadName = reply1.first().content;
                console.log(threadName);
            } catch {
                let error1 = message.reply("No response was said in time. Name not set. Command cancelled.");
                constructorMessages.push({id: error1.id});
            };

            let sent2 = await message.reply("What is the desired description of the thread?");
            constructorMessages.push({id: sent1.id});
            try {
                let reply2 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply2.first().id});
                threadDescription = reply2.first().content;
                console.log(threadDescription);
            } catch {
                let error2 = message.reply("No response was said in time. Description not set. Command cancelled.");
                constructorMessages.push({id: error1.id});
            };

            var len = constructorMessages.length;
            for (var i = 0; i < len; i++) {
                let msg = await message.channel.fetchMessage(constructorMessage[i].id);
                await msg.delete();
            }
            
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