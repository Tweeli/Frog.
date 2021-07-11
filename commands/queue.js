const discord = require("discord.js");

module.exports.run = async (bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("Er is geen muziek aan het spelen op dit moment.");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `> Nu aan het spelen ${nowPlaying.songTitle} || Aangevraagd door ${nowPlaying.requester}. \n\n > queue: \n`;

    for (let index = 0; index < queue.length; index++) {

        response += `> ${index}. ${queue[index].songTitle} Aangevraagd door ${queue[index].requester}\n`;

    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue",
    description: "Geeft de liedjes weer die in de queue staan.",
    category: "Muziek."
}