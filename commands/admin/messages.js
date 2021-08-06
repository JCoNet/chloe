module.exports = {
    name: "messages",
    description: "Enable or disable server messages from the bot!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.").then(msg => msg.delete({timeout: 9000})).catch(err => console.error(err));
        let result = await connection.query(`SELECT welcomeEnabled, announcementEnabled, newfeatureEnabled FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.error(err));
        let results = result[0];
        let welcome = await results[0].welcomeEnabled;
        let newfeat = await results[0].newfeatureEnabled;
        let announcement = await results[0].announcementEnabled;
        let welcomeState;
        let newfeatState;
        let announcementState;
    
        // set welcome state
        if (welcome == 1) {
            welcomeState = "ENABLED";
        } else {
            welcomeState = "DISABLED";
        };
    
        // set newfeat state
        if (newfeat == 1) {
            newfeatState = "ENABLED";
        } else {
            newfeatState = "DISABLED";
        };
    
        // set announcement state
        if (announcement == 1) {
            announcementState = "ENABLED";
        } else {
            announcementState = "DISABLED";
        };
    
        let check = message.guild.iconURL();
        let serverIcon;
        if (!check) {
            serverIcon = "https://jconet.co.uk/resources/JCN.png";
        } else {
            serverIcon = check;
        };
    
        let setEmbed = new Discord.MessageEmbed()
        .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk')
        .setColor('#f59e2c')
        .setTitle(`Set messages for ${message.guild.name}`)
        .setDescription("This is the message to configure the messages we send automatically to your server.")
        .setThumbnail(serverIcon)
        .addFields(
            {name: "Welcome Message", value: `${welcomeState}`, inline: true},
            {name: "System Message", value: `${newfeatState}`, inline: true},
            {name: "Announcement Message", value: `${announcementState}`, inline: true},
        )
        .setFooter("Click the buttons bellow to change the states above or close the config. You have to run the command again for each action you take.");
        
        let ewelcbut = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel("Enable Welcomes")
        .setCustomId("enablewelc");
    
        let enewfeatbut = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel("Enable New Features")
        .setCustomId("enablenewfeat");
    
        let eannouncebut = new Discord.MessageButton()
        .setStyle('SUCCESS')
        .setLabel("Enable Announcements")
        .setCustomId("enableann");
    
        let dwelcbut = new Discord.MessageButton()
        .setStyle('DANGER')
        .setLabel("Disable Welcomes")
        .setCustomId("disablewelc");
    
        let dnewfeatbut = new Discord.MessageButton()
        .setStyle('DANGER')
        .setLabel("Disable New Features")
        .setCustomId("disablenewfeat");
    
        let dannouncebut = new Discord.MessageButton()
        .setStyle('DANGER')
        .setLabel("Disable Announcements")
        .setCustomId("disableann");
    
        let cancel = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setLabel("CLOSE CONFIG")
        .setCustomId("admincancel");
    
        let enable = "false";
        let disable = "false";
        let emessages = new Discord.MessageActionRow();
        let dmessages = new Discord.MessageActionRow();
    
        if (welcome == 0 || newfeat == 0 || announcement == 0) {
            enable = "true";
            if (welcome == 0) {
                emessages.addComponents(ewelcbut);
            };
            
            if (newfeat == 0) {
                emessages.addComponents(enewfeatbut);
            };
            
            if (announcement == 0) {
                emessages.addComponents(eannouncebut);
            };
        };
    
        if (welcome == 1 || newfeat == 1 || announcement == 1) {
            disable = "true";
            if (welcome == 1) {
                dmessages.addComponents(dwelcbut);
            };
            
            if (newfeat == 1) {
                dmessages.addComponents(dnewfeatbut);
            };
            
            if (announcement == 1) {
                dmessages.addComponents(dannouncebut);
            };
        };
    
        let embedcontrol = new Discord.MessageActionRow()
        .addComponents(cancel);
    
        if (enable == "true" && disable == "false") {
            message.channel.send({
                embed: setEmbed,
                components:[emessages, embedcontrol]
            }).catch(err => console.error(err));
        } else if ( enable == "false" && disable == "true") {
            message.channel.send({
                embed: setEmbed,
                components:[dmessages, embedcontrol]
            }).catch(err => console.error(err));
        } else if ( enable == "true" && disable == "true") {
            message.channel.send({
                embeds: [setEmbed],
                components:[emessages, dmessages, embedcontrol]
            }).catch(err => console.error(err));
        } else {
            message.channel.send("I ran into an error please report to JCN Development that you have an issue with command 'messages' via the JCoNet Website").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
        };
    },
};