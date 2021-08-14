const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./data/staffWarns.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !warn spelerNaam redenen hier.

    if (!message.member.roles.cache.has('664134760376958986')) return message.reply('Jij kan dit niet');

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!args[1]) return message.reply("Gelieve een redenen op te geven.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

    var warnUser = message.guild.member(message.mentions.users.first() || bot.users.cache.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Kan de gebruiker niet vinden.");


    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./staffWarns.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });
      var warnEmbed = new discord.MessageEmbed()
        .setColor("#6aa75e")
        .setFooter('TeamDJD | Den Haag Stad V2', 'https://cdn.discordapp.com/attachments/755878713668796446/872847136478351380/image0.png')
        .setTimestamp()
        .setDescription(`**Gewarnd:** ${warnUser} (${warnUser.id})
        **Staff warn gegeven door:** ${message.author}
        **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns)
        warnUser.send({embeds: [warnEmbed]})

    var warningEmbed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarnd:** ${warnUser} (${warnUser.id})
        **Gegeven door:** ${message.author}
        **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns);

    var warninglog = message.member.guild.channels.cache.get("662586267183349760");

    warninglog.send({embeds: [warningEmbed]})
    }


module.exports.help = {
    name: "staff-warn",
    aliases: ["swarn"]
}