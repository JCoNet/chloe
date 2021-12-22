module.exports = {
    category: 'Testing',
    description: 'Replies with pong', // Required for slash commands
    
    slash: true, // Create both a slash and legacy command
    testOnly: true, // Only register a slash command for the testing guilds
    
    callback: ({ interaction }) => {
        let result = interaction.client.database.query('SELECT * FROM guildConfig WHERE guildID = ' + interaction.guild.id);
        let results = result[0];

        let reply = `${results[0].guildName}`;

        // interaction is provided only for a slash command
        interaction.reply({
        content: reply
        })
    },
  }