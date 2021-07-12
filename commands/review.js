const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const amountStars = args[0];

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Geef een aantal op tussen 1 en 5 sterren.");

    var text = args.splice(1, args.length).join(" ") || '**Geen tekst opgegeven.**';

    var channel = message.member.guild.channels.cache.get("863946165972107265");

    if (!channel) return message.reply("Het kanaal bestaat niet.");

    var stars = "";
    for (let i = 0; i < amountStars; i++) { 

        stars+= ":star: ";
    
    }

    message.delete();

    const reviewEmbed = new discord.MessageEmbed()
      .setTitle(`${message.author.username} heeft een review geschreven.`)
      .setColor("#6aa75e")
      .addField("Sterren: ", + stars)
      .addField("Review: ", text);
    
    message.channel.send("> Je hebt je review succesvol geschreven.");

    return channel.send(reviewEmbed);


}

module.exports.help = {
    name: "review"
}