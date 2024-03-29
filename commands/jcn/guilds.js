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

        const embed = new Discord.MessageEmbed()
        .setTitle("Chloe Guilds")
        .addFields([
            {name: "Server Name", value: '\u200B', inline:true},
            {name: "Server ID", value: '\u200B', inline:true},
            {name: "\u200B", value: '\u200B', inline:true},
        ])
        .setTimestamp();

        let guilds = [];
        bot.guilds.cache.each(g => guilds.push({ name: g.name, id: g.id }));
        var len = guilds.length;
        for (var i = 0; i < len; i++) {
            table.addRow(guilds[i].name, guilds[i].id);
            embed.addFields([
                {name: "\u200B", value: `${guilds[i].name}`, inline:true},
                {name: "\u200B", value: `${guilds[i].id}`, inline:true},
                {name: "\u200B", value: '\u200B', inline:true},
            ]);
        }
        table.setStyle('unicode-single');
        console.log(table.toString());
        message.channel.send({embeds: [embed]});
    },
};