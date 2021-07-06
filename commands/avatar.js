const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var member = message.guild.member(message.mentions.users.first() || bot.users.cache.get(args[0]));
    if(!member) member = message.member;

    var avatarEmbed = new discord.MessageEmbed()
        .setTitle(`Profielfoto van ${member.user.tag}`)
        .setImage(member.user.displayAvatarURL({dynamic : true, size: 4096}))
        .setColor("#6aa75e")
        .setFooter('Created by Tweeli.#0001');
    message.channel.send(avatarEmbed)   

}

module.exports.help = {
    name: "avatar",
    aliases: ["av", "pf", "profielfoto", "pfp"]
}
