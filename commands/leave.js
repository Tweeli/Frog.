const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {

    if (!message.member.voice.channel) return message.reply("Join eerst een spraakkanaal.");

    if (!message.guild.me.voice.channel) return message.channel.send("Sorry, de bot is niet verbonden.");

    if(message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("Sorry je bent niet verbonden met het zelfde kanaal.");

    message.guild.me.voice.channel.leave();

}

module.exports.help = {
    name: "leave",
    description: "Speel muziek af met deze command!",
    catagory: "Muziek."
}