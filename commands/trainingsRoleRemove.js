const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var trainingsRole = message.guild.roles.cache.get('757904431051440219');
    
    message.member.roles.remove(trainingsRole.id);

    return message.reply("Je trainingsrole is weggehaalt! | 📚")

}

module.exports.help = {
    name: "trainingsroleremove",
    aliases: ["trainingsdelete", "trainingsrole-remove", "trainingsroleremove"]
}