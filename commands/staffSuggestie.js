const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.has('682635913431482471')) return message.reply('Jij kan dit niet');
   
    if (!args[0]) return message.reply("Geen suggestie meegegeven.")
   
    var suggestions = message.member.guild.channels.cache.get("587601364713209857");

    const suggestieEmbed = new discord.MessageEmbed()
        .setTitle(`Suggestie van ${message.author.tag} !`)
        .setColor("#6aa75e")
        .setDescription("> Staff suggestie: " + args.join(" "))
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');

    var msg = await suggestions.send({embeds: [suggestieEmbed]})
    
    await msg.react('✅')
    await msg.react('❌')
    
    

    return message.reply("Suggestie seccesvol ingezonden!")

  
    message.delete({ timeout: 1000 });

}

module.exports.help = {
    name: "staff-suggestie",
    aliases: ["ssuggestie"]
}