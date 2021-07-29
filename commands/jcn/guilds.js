const config = require("../../botconfig.json");
const stats = require("../../package.json");
const { AsciiTable3 } = require('ascii-table3');

module.exports = {
    name: "guilds",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        var table = new AsciiTable3('Chloe Guilds')
        .setTitleAlign(60, AsciiTable3.CENTER)
        .setHeading('Server Name', 'Server ID')
        .setWidths(30,30)
        .setCellMargin(0)
        .setAlign(30, AsciiTable3.CENTER);

        let guilds = [];
        bot.guilds.cache.each(g => guilds.push({ name: g.name, id: g.id }));
        var len = guilds.length;
        for (var i = 0; i < len; i++) {
            table.addRow(guilds[i].name, guilds[i].id).setAlign(30, AsciiTable3.CENTER);;
        }
        message.channel.send(table.toString());
    },
};