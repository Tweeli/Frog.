const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botinfoEmbed = new discord.MessageEmbed()
            .setTitle('Frog. | BOT')
            .setColor("#6aa75e")
            .addField("Bot naam:", "Frog.")
            .addField("Bot ID:", "795441564397994004")
            .addField("Gemaakt door:", "Tweeli.#0001")
            .addField("Discord.js:", "V12.5.1")
            .addField("Node:", "V13.14.0")
            .addField("Platform:", "MacOS")
            .addField("Laatst geüpdate:", "24 Juni 23:44")
            .addField("Gemaakt op:", "15 Juni 2021")
            .setThumbnail('https://media.discordapp.net/attachments/850532618353246218/856213575936901190/Screenshot_2020-12-24_at_01.19.40.png')
            .setTimestamp()
            .setFooter('Created by Tweeli.#0001');

        return message.channel.send(botinfoEmbed);

}

module.exports.help = {
    name: "binfo"
}