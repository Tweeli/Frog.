const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {



    var inviteEmbed = new discord.MessageEmbed()
     .setTitle("Invites!")
     .setDescription('[Frog. Discord bot server.](https://discord.gg/c9nfzh6zTu) \n - \n [TwoepKoep chats.](https://discord.gg/VrWyrpkM6B) \n - \n [Belsterdam RolePlay info.](https://discord.gg/c9JfpqEgsD)')
     .setColor("#6aa75e")
     .setFooter('Created by Tweeli.#0001');
    message.channel.send(inviteEmbed)   

}

module.exports.help = {
    name: "invites",
    description: "Geeft leuke servers weer.",
    category: ""
}