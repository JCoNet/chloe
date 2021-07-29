const config = require("../../botconfig.json");
const stats = require("../../package.json");
const { AsciiTable3 } = require('ascii-table3');

module.exports = {
    name: "guilds",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        var table = new AsciiTable3('Chloe Guilds')
        .setHeading('Server Name', 'Server ID')
        .setWidths([30,30])
        .setCellMargin(0)

        let guilds = [];
        bot.guilds.cache.each(g => guilds.push({ name: g.name, id: g.id }));
        var len = guilds.length;
        for (var i = 0; i < len; i++) {
            table.addRowMatrix([guilds[i].name, guilds[i].id]);
        }
        table.setStyle('unicode-single');
        message.channel.send(table.toString());
    },
};