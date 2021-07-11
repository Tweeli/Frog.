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

    });

}

module.exports.help = {
    name: "search",
    descripton: "Zoek het juiste liedje met deze command!",
    category: "Muziek."
}