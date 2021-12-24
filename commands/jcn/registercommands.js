// const token = process.env.token;
const token = process.env.betatoken;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        const rest = new REST({ version: '9' }).setToken(process.env.betatoken);
        rest.get(Routes.applicationCommands(process.env.botbetaid)).then(data => {
            const promises = [];
            for (const command of data) {
                try {
                    const deleteUrl = `${Routes.applicationCommands(process.env.botbetaid)}/${command.id}`;
                    promises.push(rest.delete(deleteUrl));
                    console.log(command.name + " " + command.description + " Removed.");
                } catch {
                    if (err) {
                        console.error(err);
                    }
                };
            }
            return Promise.all(promises);
        });

    },
};