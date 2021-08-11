module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        let data = await [{
            name: 'ping',
            description: 'Test the latency of this bot!'
        }, {
            name: 'role',
            description: 'Add or remove a role from a user.',
            options: [
                {
                    type: 'string',
                    name: 'operation',
                    description: 'What would you like to do?',
                    required: true,
                    choices: ['add', 'remove'],
                }
            ],
        }]
        let newCommand = await bot.application?.commands.create(data);
        console.log(newCommand);      
    },
};