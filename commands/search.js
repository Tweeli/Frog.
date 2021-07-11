const { Collection } = require("discord.js");
const search = require("yt-search");

module.exports.run = async (bot, message, args, ops) => {

    search(args.join(" "), function (err, res){

        if (err) return message.reply("Er is iets fout gelopen.");

        var videos = res.videos.slice(0, 10);

        var respone = "";

        for(var vid in videos){
            respone += `**[${parseInt(vid) +1}]:** ${videos[vid].title} \r\n`;
        }

        respone += `Kies een nummer tussen 0 en ${videos.length}.`;

        message.channel.send(respone);

        const filter = music => !isNaN(music.content) && music.content < videos.length +1 && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos; 

        collection.once("collect", function (music) {

            var commandFile = require("./play.js");

            commandFile.run(bot, message, [this.videos[parseInt(music.content) - 1].url], ops);

        })

    });

}

module.exports.help = {
    name: "search",
    descripton: "Zoek het juiste liedje met deze command!",
    category: "Muziek."
}