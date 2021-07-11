const discord = require("discord.js");

module.exports.run = async (bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("> Er is geen muziek aan het spelen op dit moment.");

    if (message.member.voice.channel != message.guild.me.voice.channel) return message.reply("Sorry, je zit niet in het zelfde spraakkanaal.");

    if (guildIDData.dispatcher.paused) return message.reply("De muziek is al gepauzeerd.");

    guildIDData.dispatcher.pause();

    return message.channel.send("> De muziek is succesvol gepauzeerd.");

}

module.exports.help = {
    name: "pauze",
    description: "Zet met deze command de muziek op pauze!",
    category: "Muziek."
}