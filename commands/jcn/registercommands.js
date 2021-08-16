module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        // bot.application?.commands.create({
        //     name: 'ping',
        //     description: 'Test the latency of this bot!'
        // }).then(cmd => console.log(cmd));    
        
        // bot.application?.commands.create({
        //     name: 'role',
        //     description: 'Add or remove a role from a user.',
        //     options: [
        //         {
        //             type: 'STRING',
        //             name: 'operation',
        //             description: 'What would you like to do?',
        //             required: true,
        //             choices: [{
        //                 name: 'add',
        //                 value: 'add'
        //             }, {
        //                 name: 'remove',
        //                 value: 'remove'
        //             }],
        //         }, {
        //             type: 'USER',
        //             name: 'user',
        //             description: 'The user mention or id to target.',
        //             required: true,
        //         }, {
        //             type: 'ROLE',
        //             name: 'role',
        //             description: 'The role mention or id to select.',
        //             required: true,
        //         }
        //     ],
        // }).then(cmd => console.log(cmd));

        bot.application?.commands.create({
            name: "whois",
            description: "Lookup info about you or another user!",
            options: [
                {
                    type: "USER",
                    name: "user",
                    description: "The user to target.",
                    required: false,
                },
            ],
        }).then(cmd => console.log(cmd));
    },
};