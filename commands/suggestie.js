const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!args[0]) return message.reply("Geen suggestie meegegeven.")
    var suggestions = message.member.guild.channels.cache.get("863955314819072061");

    const suggestieEmbed = new discord.MessageEmbed()
        .setTitle(`Suggestie van ${message.author.mention} !`)
        .setColor("#6aa75e")
        .setDescription(args.join(" "))
        .setFooter('Created by Tweeli.#0001');

    var msg = await suggestions.send(suggestieEmbed);

    await msg.react('✅');
    await msg.react('❌');

    message.delete({ timeout: 1000 });

}

module.exports.help = {
    name: "suggestie"
}