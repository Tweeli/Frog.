const discord = require("discord.js");

module.exports.run = async (bot, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("> Er is geen muziek aan het spelen op dit moment.");

    if (message.member.voice.channel != message.guild.me.voice.channel) return message.reply("Sorry, je zit niet in het zelfde spraakkanaal.");

    if (!guildIDData.dispatcher.paused) return message.reply("De muziek is niet gepauzeerd.");

    guildIDData.dispatcher.pause();

    return message.channel.send("> De muziek is succesvol herstart.");

}

module.exports.help = {
    name: "resume",
    description: "Herstart de muziek weer met deze command!",
    category: "Muziek."
}