const discord = require("discord.js");

module.exports.run = async (bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.reply("Er is geen muziek aan het spelen op dit moment.");

    if (message.member.voice.channel != message.guild.me.voice.channel) return message.reply("Sorry, je zit niet in het zelfde spraakkanaal.");

    if (isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.reply("Gelieve een nummer op te geven tussen O - 150");

    guildIDData.dispatcher.setVolume(args[0] / 100);
    
    return message.reply(`Volume aangepast naar ${args[0]}`);



}

module.exports.help = {
    name: "volume",
    description: "Met deze command kan je de muziek luider of zachter zetten!",
    category: "Muziek."
}