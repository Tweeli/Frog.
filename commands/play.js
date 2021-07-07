const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {

    if (!message.member.voice.channel) return message.reply("Join eerst een spraakkanaal.");

    if (message.guild.me.voice.channel) return message.channel.send("Sorry, de bot is al verbonden.");

    if (!args[0]) return message.reply("Gelieven een url mee te geven.");

    var validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("Sorry, gelieve een juiste url op te geven.");

    var info = await ytdl.getInfo(args[0]);

    var options = { seek: 3, volume: 1 };

    var channeJoin = message.member.voice.channel.join()
        .then(voiceChannel => {

            var stream = ytdl(args[0], { filter: 'audioonly' });
            var dispatcher = voiceChannel.play(stream, options);

        }).catch(console.error);

    message.channel.send(`> Nu aan het spelen ${info.title}`);

}

module.exports.help = {
    name: "play",
    description: "Speel muziek af met deze command!",
    catagory: "Muziek."
}