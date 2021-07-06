const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var halloEmbed = new discord.MessageEmbed()
     .setDescription("Hallo!")
     .setColor("#6aa75e")
     .setFooter('Created by Tweeli.#0001');
    message.channel.send(halloEmbed)   

}

module.exports.help = {
    name: "hallo",
    description: "",
    category: ""
}
