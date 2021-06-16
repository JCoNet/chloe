const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args, connection, useprefix) => {
    const body = { a: 1 };
 
    fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json',
            'Client-ID': 's1oz3d7viau3bejls86w3vybh7li30',
            'Authorization': 'Bearer viuevew3f4jn29happenr7laj9equ0',
        },
    })
    .then(res => res.json())
    .then(json => console.log(json));
};

module.exports.help = {
    name: "newfeatures"
}