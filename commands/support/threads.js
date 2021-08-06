module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/archive/delete>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            let threadName;
            let threadDescription;
            let filter = m => m.author.id == message.author.id;
            let constructorMessages = [];

            constructorMessages.push({id: message.id});

            let sent1 = await message.reply("What is the desired name of the thread?");
            constructorMessages.push({id: sent1.id});
            try {
                let reply1 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply1.first().id});
                threadName = reply1.first().content;
            } catch {
                let error1 = message.reply("No response was said in time. Name not set. Command cancelled.");
                constructorMessages.push({id: error1.id});
            };

            let sent2 = await message.reply("What is the desired description of the thread?");
            constructorMessages.push({id: sent2.id});
            try {
                let reply2 = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply2.first().id});
                threadDescription = reply2.first().content;
            } catch {
                let error2 = message.reply("No response was said in time. Description not set. Command cancelled.");
                constructorMessages.push({id: error1.id});
            };

            var len = constructorMessages.length;
            let chan = message.channel;
            let messages = [];
            for (var i = 0; i < len; i++) {
                let msg = await chan.messages.fetch(constructorMessages[i].id);
                messages.push(msg);
            };
            try {
                await chan.bulkDelete(messages);
            } catch {
                err => console.error(err);
            };
            
            try {
                let threadChannel = await message.channel.threads.create({
                    name: threadName,
                    autoArchiveDuration: 60,
                    reason: `${message.author.username} requested the channel be created.`,
                });
                threadChannel.send(`${message.author.username} requested this thread be created.\nTopic: ${threadDescription}`);
                console.log(`Thread made: ${threadChannel.id}`)
            } catch {
                err => console.log(err);
            };

        } else if (args[0].toLowerCase() == 'archive') {
            let threadName;
            let constructorMessages = [];
            let filter = m => m.author.id == message.author.id;

            constructorMessages.push({id: message.id});

            let sent = await message.reply("What is the name of the thread you wish to archive?");
            constructorMessages.push({id: sent.id});
            try {
                let reply = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply.first().id});
                threadName = reply.first().content;
            } catch {
                let error = message.reply("No response was said in time. Name not given. Command cancelled.");
                constructorMessages.push({id: error.id});
            };

            var len = constructorMessages.length;
            let chan = message.channel;
            let messages = [];
            for (var i = 0; i < len; i++) {
                let msg = await chan.messages.fetch(constructorMessages[i].id);
                messages.push(msg);
            };

            try {
                await chan.bulkDelete(messages);
            } catch {
                err => console.error(err);
            };

            try {
                const thread = message.channel.threads.cache.find(x => x.name == threadName);
                await thread.setArchived(true);
                let sent = await message.channel.send(`The thread **${threadName}** has been archived.`);
                await sent.react("<a:JCNVerifiedMessage:872672152313294858>");
            } catch {
                err => console.error(err);
            };

        } else if (args[0].toLowerCase() == 'delete') {
            let threadName;
            let constructorMessages = [];
            let filter = m => m.author.id == message.author.id;

            constructorMessages.push({id: message.id});

            let sent = await message.reply("What is the name of the thread you wish to delete?");
            constructorMessages.push({id: sent.id});
            try {
                let reply = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ['time'] });
                constructorMessages.push({id: reply.first().id});
                threadName = reply.first().content;
            } catch {
                let error = message.reply("No response was said in time. Name not given. Command cancelled.");
                constructorMessages.push({id: error.id});
            };

            var len = constructorMessages.length;
            let chan = message.channel;
            let messages = [];
            for (var i = 0; i < len; i++) {
                let msg = await chan.messages.fetch(constructorMessages[i].id);
                messages.push(msg);
            };

            try {
                await chan.bulkDelete(messages);
            } catch {
                err => console.error(err);
            };

            try {
                const thread = message.channel.threads.cache.find(x => x.name == threadName);
                await thread.delete();
                let sent = await message.channel.send(`The thread **${threadName}** has been deleted.`);
                await sent.react("<a:JCNVerifiedMessage:872672152313294858>");
            } catch {
                err => console.error(err);
            };

        } else {
            let sent = await message.reply("Please enter a valid operation type. They are add, archive and delete.");
            await sent.react("<a:JCNVerifiedMessage:872672152313294858>");
        }
    },
};