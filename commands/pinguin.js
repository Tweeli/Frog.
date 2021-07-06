const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var avEmbed = new discord.MessageEmbed()
        .setTitle("Pinguïn")
        .setImage("https://cdn.discordapp.com/attachments/855712880622960680/856529078185754694/pingui.jpeg")
        .setColor("#6aa75e")
        .setFooter('Created by Tweeli.#0001');
    message.channel.send(avEmbed)   

}

module.exports.help = {
    name: "pinguin"
}
