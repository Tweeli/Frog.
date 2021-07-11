const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {



    var inviteEmbed = new discord.MessageEmbed()
     .setTitle("Invites!")
     .setDescription('Frog. Discord bot server. [klik](https://discord.gg/c9nfzh6zTu)')
     .setColor("#6aa75e")
     .setFooter('Created by Tweeli.#0001');
    message.channel.send(inviteEmbed)   

}

module.exports.help = {
    name: "invite",
    description: "",
    category: ""
}