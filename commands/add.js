const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var categoryID = "784414133051064390";

    if (!message.member.roles.cache.has('682635913431482471')) return message.reply('Jij kan dit niet');

    if (message.channel.parentID != categoryID) return message.reply("Dit command kan je alleen uitvoeren in een ticket.");

    var addUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if (!addUser) return message.reply("Geen gebruiker meegegeven.")

    var embedPromt = new discord.MessageEmbed()
        .setColor("#6aa75e")
        .setTitle("Gelieve te antwoorden binnen 30 seconden.")
        .setDescription(`Wil je ${addUser} toevoegen? | Created by Tweeli.#0001`)
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');
    
    var toevoegEmbed = new discord.MessageEmbed()
        .setTitle("Gebruiker toegevoegd.")
        .setColor("#6aa75e")
        .setTimestamp()
        .addField("Toegevoegde gebruiker", `${addUser}`)
        .addField("Persoon toegevoegd door", message.author)
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png');

    message.reply(embedPromt).then(async msg => {

        message.delete();

        var emoji = await promtMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji == "✅") {

            msg.delete();

            message.channel.updateOverwrite(addUser,{
                READ_MESSAGES: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            });

            message.channel.send(toevoegEmbed).then(msg => msg.delete({timeout: 5000 }));

        }else if (emoji == "❌"){

            msg.delete();

            
            message.reply("Toevoeging geanuleerd.").then(msg => msg.delete({timeout: 3000 }));
        }

    })

}

async function promtMessage(message, author, time, reactions) {
    
    time *= 1000;
 
   
    for (const reaction of reactions) {
        await message.react(reaction);
    }
 
    
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
 
    
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}

module.exports.help = {
    name: "add",
    aliases: []
}
