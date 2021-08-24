module.exports = {
    name: "id",
    description: "View your very own JCoNet Digital ID!",
    async execute(Discord, bot, connection, interaction) {
        let result = await connection.query(`SELECT * FROM digitalID WHERE userID = "${interaction.user.id}"`).catch(err => console.error(err));
        let results = result[0];

        interaction.reply({ content: `${results.toString()}`, ephemeral: true});
    },
};