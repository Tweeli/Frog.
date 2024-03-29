discord = require("discord.js")

module.exports.run = async(bot, message, args) => {

   
    if (!message.member.roles.cache.has('682635913431482471')) return message.reply('Jij kan dit niet');
    
    if(!args[0]) return message.reply("Geen gebruiker opgegeven!");
    
    var banUser = message.guild.member( message.mentions.users.first() || message.guild.members.get(args[1]));
    
    const banChannel = message.guild.channels.cache.find(c => c.name == "「📃」user-logs")
    
    
    if(!args[1]) return message.reply("Geen redenen opgegeven")
    
    
    var reason = args.slice(1).join(" ");
    
    if(!banUser) return message.reply("Gebruiker niet gevonden!");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("#6aa75e")
        .setDescription(`Wil je ${banUser} bannen?`)
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');

    var embed = new discord.MessageEmbed()
        .setColor("#6aa75e")
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png')
        .setTimestamp()
        .setDescription(`**Gebannen: ** ${banUser} \n**Gebannen door:** ${message.author} \n**Reden: ** ${reason}`);

    message.reply(embedPrompt).then(async msg => {

    message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1}).then(collected => {

        if(collected.first().content.toLowerCase() == 'ja' || `yes`) {
            
            banChannel.send(embed)
        banUser.ban({ reason: reason }).catch(err => {
            if (err) return message.channel.send(`Er is iets foutgegaan.`)
            console.log(err);
        });

        
        }else {
            message.reply("Geanuleerd")
        }
        message.channel.send(`${message.author} je hebt ${banUser} succesvol gebannen!`)
    })
})
}

module.exports.help = {
    name: "ban",
    aliases: []
}
